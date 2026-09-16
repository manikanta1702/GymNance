const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ==============================
// DATABASE CONNECTION
// ==============================

pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL connected successfully!");
    client.release();
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error);
  });

// ==============================
// JWT AUTHENTICATION MIDDLEWARE
// ==============================

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization token is required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "GymNance API is running",
  });
});

// ==============================
// SIGNUP
// ==============================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email`,
      [fullName, email, passwordHash]
    );

    res.status(201).json({
      message: "Account created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error during signup",
    });
  }
});

// ==============================
// LOGIN
// ==============================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// ==============================
// TEST PROTECTED ROUTE
// ==============================

app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    res.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("User fetch error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// SAVE COMPLETED WORKOUT
// ==============================

app.post("/api/workouts/sessions", authenticateToken, async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      workoutId,
      workoutName,
      completedAt,
      totalSets,
      totalReps,
      totalVolume,
      sets,
    } = req.body;

    if (!workoutId || !workoutName) {
      return res.status(400).json({
        message: "Workout information is required",
      });
    }

    await client.query("BEGIN");

    // Create workout session
    const sessionResult = await client.query(
      `INSERT INTO workout_sessions
       (
         user_id,
         workout_id,
         workout_name,
         completed_at,
         total_sets,
         total_reps,
         total_volume
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        req.user.id,
        workoutId,
        workoutName,
        completedAt || new Date(),
        totalSets || 0,
        totalReps || 0,
        totalVolume || 0,
      ]
    );

    const sessionId = sessionResult.rows[0].id;

    // Save individual sets
    if (Array.isArray(sets)) {
      for (const set of sets) {
        await client.query(
          `INSERT INTO workout_sets
           (
             session_id,
             exercise_id,
             set_number,
             weight,
             reps,
             completed
           )
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            sessionId,
            set.exerciseId,
            set.setNumber,
            set.weight || 0,
            set.reps || 0,
            set.completed || false,
          ]
        );
      }
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Workout saved successfully",
      sessionId,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Workout save error:", error);

    res.status(500).json({
      message: "Failed to save workout",
    });
  } finally {
    client.release();
  }
});

// ==============================
// GET USER WORKOUT HISTORY
// ==============================

app.get("/api/workouts/history", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         id,
         workout_id,
         workout_name,
         started_at,
         completed_at,
         total_sets,
         total_reps,
         total_volume
       FROM workout_sessions
       WHERE user_id = $1
       ORDER BY completed_at DESC`,
      [req.user.id]
    );

    res.json({
      workouts: result.rows,
    });
  } catch (error) {
    console.error("Workout history error:", error);

    res.status(500).json({
      message: "Failed to fetch workout history",
    });
  }
});

// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GymNance server running on http://localhost:${PORT}`);
});