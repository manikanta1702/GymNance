import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import About from "./pages/About";
import ExerciseDetails from "./pages/ExerciseDetails";
import WorkoutDetails from "./pages/WorkoutDetails";
import WorkoutSession from "./pages/WorkoutSession";
import WorkoutSummary from "./pages/WorkoutSummary";
import WorkoutHistory from "./pages/WorkoutHistory";

import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/* GymNance App */}
        <Route path="/app" element={<AppLayout />}>
        <Route path="history" element={<WorkoutHistory />} />
          <Route path="dashboard" element={<Dashboard />} />  
          <Route path="exercises" element={<Exercises />} />
          <Route path="exercises/:id" element={<ExerciseDetails />} />  
          <Route path="workouts" element={<Workouts />} />
          <Route path="workouts/:id" element={<WorkoutDetails />} />
          <Route path="workouts/:id/session" element={<WorkoutSession />} />
          <Route path="workouts/:id/summary" element={<WorkoutSummary />} />
          <Route path="nutrition" element={<Nutrition />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;