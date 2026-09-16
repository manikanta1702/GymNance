const exercises = [
  // =========================
  // CHEST
  // =========================

  {
    id: 1,
    name: "Barbell Bench Press",
    primaryMuscles: [
    "Pectoralis Major",
  ],

  secondaryMuscles: [
    "Anterior Deltoid",
    "Triceps",
  ],

  muscleExplanation:
    "The barbell bench press primarily trains the chest muscles. The shoulders and triceps assist during the pressing movement.",

  commonMistakes: [
    "Bouncing the bar off the chest.",
    "Using excessive weight.",
    "Losing control during the lowering phase.",
    "Incorrect hand or wrist positioning.",
  ],

  videoUrl: "",

    muscle: "Chest",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "10 min",
    description:
      "A classic pressing exercise for developing the chest, shoulders, and triceps.",
    steps: [
      "Lie flat on the bench with your feet firmly on the floor.",
      "Grip the bar slightly wider than shoulder width.",
      "Unrack the bar and position it above your chest.",
      "Lower the bar slowly toward the middle of your chest.",
      "Press the bar upward until your arms are extended.",
      "Repeat while keeping the movement controlled.",
    ],
    tips: [
      "Keep your shoulder blades pulled back and down.",
      "Do not bounce the bar off your chest.",
      "Use a spotter when lifting heavy weights.",
    ],
  },

  {
    id: 2,
    name: "Incline Barbell Bench Press",
    muscle: "Chest",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "10 min",
    description:
      "An incline pressing movement that emphasizes the upper chest.",
    steps: [
      "Set the bench to a moderate incline.",
      "Lie back with your feet firmly planted.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower the bar toward your upper chest.",
      "Press the bar upward in a controlled motion.",
      "Return to the starting position.",
    ],
    tips: [
      "Keep your upper back supported.",
      "Avoid bouncing the bar.",
      "Use controlled repetitions.",
    ],
  },

  {
    id: 3,
    name: "Decline Bench Press",
    muscle: "Chest",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "10 min",
    description:
      "A pressing exercise performed on a decline bench to emphasize the lower chest.",
    steps: [
      "Secure your legs on the decline bench.",
      "Lie back and grip the bar slightly wider than shoulder width.",
      "Unrack the bar above your chest.",
      "Lower the bar toward your lower chest.",
      "Press the bar back upward.",
      "Repeat with controlled movement.",
    ],
    tips: [
      "Keep your body securely positioned on the bench.",
      "Avoid using excessive weight.",
      "Use a spotter for heavy sets.",
    ],
  },

  {
    id: 4,
    name: "Dumbbell Bench Press",
    muscle: "Chest",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "10 min",
    description:
      "A dumbbell pressing movement that trains the chest while allowing independent arm movement.",
    steps: [
      "Lie flat on a bench with a dumbbell in each hand.",
      "Position the dumbbells beside your chest.",
      "Press both dumbbells upward.",
      "Bring them close together without aggressively touching them.",
      "Lower them slowly toward your chest.",
      "Repeat for controlled repetitions.",
    ],
    tips: [
      "Keep your feet firmly planted.",
      "Control the dumbbells throughout the movement.",
      "Avoid dropping the weights beside you.",
    ],
  },

  {
    id: 5,
    name: "Incline Dumbbell Press",
    muscle: "Chest",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Dumbbells",
    duration: "10 min",
    description:
      "An upper-chest focused pressing movement using dumbbells.",
    steps: [
      "Set the bench to a moderate incline.",
      "Sit with a dumbbell in each hand.",
      "Position the dumbbells beside your upper chest.",
      "Press both dumbbells upward.",
      "Lower them slowly back toward your chest.",
      "Repeat with controlled movement.",
    ],
    tips: [
      "Keep your back supported.",
      "Avoid excessive arching.",
      "Use a weight that allows full control.",
    ],
  },

  {
    id: 6,
    name: "Dumbbell Chest Fly",
    muscle: "Chest",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "8 min",
    description:
      "An isolation movement designed to train the chest through a controlled fly motion.",
    steps: [
      "Lie flat on a bench holding dumbbells above your chest.",
      "Keep a slight bend in your elbows.",
      "Lower the dumbbells outward in a controlled arc.",
      "Stop when you feel a comfortable chest stretch.",
      "Bring the dumbbells back together.",
      "Repeat while maintaining control.",
    ],
    tips: [
      "Keep a slight bend in your elbows.",
      "Do not overstretch at the bottom.",
      "Use lighter weights than you would for pressing.",
    ],
  },

  {
    id: 7,
    name: "Cable Crossover",
    muscle: "Chest",
    category: "Isolation",
    difficulty: "Intermediate",
    equipment: "Cable Machine",
    duration: "8 min",
    description:
      "A cable-based chest isolation exercise providing consistent resistance.",
    steps: [
      "Set both cable pulleys around chest height.",
      "Grab the handles and stand in the center.",
      "Step slightly forward and stabilize your stance.",
      "Bring both handles forward and together.",
      "Squeeze your chest briefly.",
      "Return your arms slowly.",
    ],
    tips: [
      "Keep your core stable.",
      "Avoid using momentum.",
      "Control the return phase.",
    ],
  },

  {
    id: 8,
    name: "Push Ups",
    muscle: "Chest",
    category: "Bodyweight",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    duration: "7 min",
    description:
      "A bodyweight pushing exercise that trains the chest, shoulders, triceps, and core.",
    steps: [
      "Start in a high plank position.",
      "Place your hands slightly wider than shoulder width.",
      "Keep your body in a straight line.",
      "Lower your chest toward the floor.",
      "Push through your hands to return upward.",
      "Repeat while maintaining body alignment.",
    ],
    tips: [
      "Keep your hips from dropping.",
      "Keep your elbows controlled.",
      "Use an easier variation if necessary.",
    ],
  },

  // =========================
  // BACK
  // =========================

  {
    id: 9,
    name: "Pull Ups",
    muscle: "Back",
    category: "Strength",
    difficulty: "Advanced",
    equipment: "Bodyweight",
    duration: "8 min",
    description:
      "A bodyweight pulling exercise that develops the back, biceps, and grip.",
    steps: [
      "Grip the pull-up bar slightly wider than shoulder width.",
      "Hang with your arms extended.",
      "Engage your core and pull your shoulder blades down.",
      "Pull your body upward toward the bar.",
      "Continue until your chin reaches the bar.",
      "Lower yourself slowly.",
    ],
    tips: [
      "Avoid excessive swinging.",
      "Keep your core engaged.",
      "Use assisted pull-ups if needed.",
    ],
  },

  {
    id: 10,
    name: "Chin Ups",
    muscle: "Back",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    duration: "8 min",
    description:
      "A bodyweight pulling movement using an underhand grip to train the back and biceps.",
    steps: [
      "Grip the bar with your palms facing toward you.",
      "Hang with your arms extended.",
      "Engage your core.",
      "Pull your chest toward the bar.",
      "Lower yourself under control.",
      "Repeat without swinging.",
    ],
    tips: [
      "Keep your body controlled.",
      "Avoid kicking your legs.",
      "Use assistance if required.",
    ],
  },

  {
    id: 11,
    name: "Lat Pulldown",
    muscle: "Back",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Cable Machine",
    duration: "10 min",
    description:
      "A controlled vertical pulling movement targeting the latissimus dorsi.",
    steps: [
      "Sit at the lat pulldown machine.",
      "Secure your legs under the pads.",
      "Grip the bar slightly wider than shoulder width.",
      "Pull the bar toward your upper chest.",
      "Squeeze your back briefly.",
      "Return the bar slowly.",
    ],
    tips: [
      "Do not pull the bar behind your neck.",
      "Avoid using momentum.",
      "Focus on your back muscles.",
    ],
  },

  {
    id: 12,
    name: "Seated Cable Row",
    muscle: "Back",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Cable Machine",
    duration: "10 min",
    description:
      "A horizontal pulling movement for building the middle back and lats.",
    steps: [
      "Sit at the cable row station.",
      "Place your feet on the platform.",
      "Grip the handle with both hands.",
      "Sit upright and brace your core.",
      "Pull the handle toward your torso.",
      "Slowly extend your arms again.",
    ],
    tips: [
      "Keep your back neutral.",
      "Avoid excessive leaning.",
      "Squeeze your shoulder blades together.",
    ],
  },

  {
    id: 13,
    name: "Barbell Bent Over Row",
    muscle: "Back",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "10 min",
    description:
      "A compound rowing exercise targeting the upper and middle back.",
    steps: [
      "Stand with your feet around hip width apart.",
      "Hold the barbell with both hands.",
      "Hinge forward while keeping your back neutral.",
      "Pull the bar toward your lower ribs.",
      "Squeeze your back at the top.",
      "Lower the bar under control.",
    ],
    tips: [
      "Maintain a neutral spine.",
      "Do not use excessive momentum.",
      "Keep the bar close to your body.",
    ],
  },

  {
    id: 14,
    name: "One Arm Dumbbell Row",
    muscle: "Back",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    duration: "8 min",
    description:
      "A unilateral rowing exercise targeting the lats and upper back.",
    steps: [
      "Place one hand and knee on a bench.",
      "Hold the dumbbell with your opposite hand.",
      "Keep your back neutral.",
      "Pull the dumbbell toward your hip.",
      "Squeeze your back.",
      "Lower the dumbbell slowly.",
    ],
    tips: [
      "Avoid rotating your torso.",
      "Keep the movement controlled.",
      "Pull toward your hip rather than your shoulder.",
    ],
  },

  {
    id: 15,
    name: "T-Bar Row",
    muscle: "Back",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "T-Bar Machine",
    duration: "10 min",
    description:
      "A compound rowing movement for building back thickness and strength.",
    steps: [
      "Stand over the T-bar with a stable stance.",
      "Grip the handles firmly.",
      "Hinge forward while keeping your back neutral.",
      "Pull the weight toward your torso.",
      "Squeeze your back at the top.",
      "Lower the weight slowly.",
    ],
    tips: [
      "Keep your spine neutral.",
      "Avoid jerking the weight.",
      "Use controlled repetitions.",
    ],
  },

  {
    id: 16,
    name: "Face Pull",
    muscle: "Back",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Cable Machine",
    duration: "7 min",
    description:
      "A cable exercise that trains the rear shoulders and upper back.",
    steps: [
      "Attach a rope to a cable at upper-chest or face height.",
      "Grip both ends of the rope.",
      "Step back and stabilize your stance.",
      "Pull the rope toward your face.",
      "Rotate your hands outward as you pull.",
      "Return slowly.",
    ],
    tips: [
      "Keep your elbows high but controlled.",
      "Avoid using excessive weight.",
      "Focus on the upper back and rear shoulders.",
    ],
  },

  // =========================
  // LEGS
  // =========================

  {
    id: 17,
    name: "Barbell Squat",
    muscle: "Legs",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "12 min",
    description:
      "A compound lower-body movement targeting the quads, glutes, and hamstrings.",
    steps: [
      "Position the bar securely across your upper back.",
      "Stand with your feet around shoulder width apart.",
      "Brace your core.",
      "Bend your hips and knees to lower your body.",
      "Descend to a comfortable depth while maintaining control.",
      "Drive through your feet to stand.",
    ],
    tips: [
      "Keep your knees tracking with your toes.",
      "Maintain a stable torso.",
      "Prioritize technique before adding weight.",
    ],
  },

  {
    id: 18,
    name: "Front Squat",
    muscle: "Legs",
    category: "Strength",
    difficulty: "Advanced",
    equipment: "Barbell",
    duration: "10 min",
    description:
      "A squat variation that places the bar in front of the body and emphasizes the quadriceps.",
    steps: [
      "Position the bar across the front of your shoulders.",
      "Keep your elbows lifted.",
      "Brace your core.",
      "Bend your knees and hips to squat down.",
      "Maintain an upright torso.",
      "Drive upward through your feet.",
    ],
    tips: [
      "Keep your elbows high.",
      "Maintain a strong core.",
      "Start with manageable weight.",
    ],
  },

  {
    id: 19,
    name: "Leg Press",
    muscle: "Legs",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Machine",
    duration: "10 min",
    description:
      "A machine-based lower-body exercise focused on the quadriceps and glutes.",
    steps: [
      "Sit comfortably in the leg press machine.",
      "Place your feet around shoulder width apart.",
      "Release the safety mechanism according to the machine.",
      "Lower the platform by bending your knees.",
      "Push through your feet.",
      "Return under control.",
    ],
    tips: [
      "Keep your lower back supported.",
      "Do not lock your knees forcefully.",
      "Use controlled repetitions.",
    ],
  },

  {
    id: 20,
    name: "Leg Extension",
    muscle: "Legs",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Machine",
    duration: "8 min",
    description:
      "An isolation exercise that targets the quadriceps.",
    steps: [
      "Sit in the leg extension machine.",
      "Position the pad comfortably above your ankles.",
      "Grip the handles and stabilize your body.",
      "Extend your legs upward.",
      "Pause briefly at the top.",
      "Lower the weight slowly.",
    ],
    tips: [
      "Avoid swinging the weight.",
      "Use controlled movement.",
      "Adjust the machine to your body.",
    ],
  },

  {
    id: 21,
    name: "Lying Leg Curl",
    muscle: "Legs",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Machine",
    duration: "8 min",
    description:
      "A machine exercise designed to isolate the hamstrings.",
    steps: [
      "Lie face down on the leg curl machine.",
      "Position your ankles beneath the pads.",
      "Hold the handles.",
      "Curl your heels toward your glutes.",
      "Squeeze your hamstrings.",
      "Lower the weight slowly.",
    ],
    tips: [
      "Keep your hips against the pad.",
      "Avoid using momentum.",
      "Control the lowering phase.",
    ],
  },

  {
    id: 22,
    name: "Romanian Deadlift",
    muscle: "Legs",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "10 min",
    description:
      "A hip-hinge movement emphasizing the hamstrings and glutes.",
    steps: [
      "Stand with your feet around hip width apart.",
      "Hold the barbell in front of your thighs.",
      "Brace your core and keep your back neutral.",
      "Push your hips backward.",
      "Lower the bar while maintaining a controlled stretch.",
      "Drive your hips forward to stand.",
    ],
    tips: [
      "Keep the bar close to your legs.",
      "Do not round your lower back.",
      "Focus on the hip hinge.",
    ],
  },

  {
    id: 23,
    name: "Walking Lunges",
    muscle: "Legs",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    duration: "8 min",
    description:
      "A unilateral lower-body exercise targeting the quads, glutes, and hamstrings.",
    steps: [
      "Stand upright with your feet together.",
      "Step forward with one leg.",
      "Lower your hips toward the floor.",
      "Push through your front foot.",
      "Bring the opposite leg forward.",
      "Continue alternating sides.",
    ],
    tips: [
      "Keep your torso controlled.",
      "Keep your front knee stable.",
      "Take comfortable step lengths.",
    ],
  },

  {
    id: 24,
    name: "Bulgarian Split Squat",
    muscle: "Legs",
    category: "Strength",
    difficulty: "Advanced",
    equipment: "Dumbbells",
    duration: "10 min",
    description:
      "A single-leg squat variation that strongly trains the quads and glutes.",
    steps: [
      "Place one foot behind you on a bench.",
      "Position your front foot securely on the floor.",
      "Lower your hips toward the floor.",
      "Keep your front knee controlled.",
      "Drive through the front foot.",
      "Return to the starting position.",
    ],
    tips: [
      "Start without weights if learning the movement.",
      "Keep your front foot stable.",
      "Use controlled repetitions.",
    ],
  },

  {
    id: 25,
    name: "Standing Calf Raise",
    muscle: "Legs",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Machine",
    duration: "7 min",
    description:
      "An isolation exercise for developing the calf muscles.",
    steps: [
      "Stand on the calf raise platform.",
      "Position the balls of your feet securely.",
      "Lower your heels under control.",
      "Push through your toes.",
      "Raise your heels as high as comfortable.",
      "Lower slowly.",
    ],
    tips: [
      "Use a full controlled range of motion.",
      "Avoid bouncing.",
      "Pause briefly at the top.",
    ],
  },

  // =========================
  // SHOULDERS
  // =========================

  {
    id: 26,
    name: "Dumbbell Shoulder Press",
    muscle: "Shoulders",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Dumbbells",
    duration: "8 min",
    description:
      "A pressing movement that develops the shoulders and supporting upper-body muscles.",
    steps: [
      "Sit upright with a dumbbell in each hand.",
      "Position the dumbbells around shoulder height.",
      "Brace your core.",
      "Press both dumbbells upward.",
      "Extend your arms under control.",
      "Lower the dumbbells slowly.",
    ],
    tips: [
      "Avoid excessive lower-back arching.",
      "Use controlled movement.",
      "Choose a manageable weight.",
    ],
  },

  {
    id: 27,
    name: "Arnold Press",
    muscle: "Shoulders",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Dumbbells",
    duration: "8 min",
    description:
      "A shoulder pressing variation combining rotation with an overhead press.",
    steps: [
      "Sit upright holding dumbbells in front of your shoulders.",
      "Start with your palms facing you.",
      "Press upward while rotating your palms forward.",
      "Extend your arms overhead.",
      "Reverse the rotation as you lower.",
      "Return to the starting position.",
    ],
    tips: [
      "Perform the rotation smoothly.",
      "Do not rush the movement.",
      "Keep your core stable.",
    ],
  },

  {
    id: 28,
    name: "Dumbbell Lateral Raise",
    muscle: "Shoulders",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "7 min",
    description:
      "An isolation exercise emphasizing the side deltoids.",
    steps: [
      "Stand upright holding dumbbells beside your body.",
      "Keep a slight bend in your elbows.",
      "Raise your arms outward.",
      "Lift until approximately shoulder height.",
      "Pause briefly.",
      "Lower the dumbbells slowly.",
    ],
    tips: [
      "Use light to moderate weight.",
      "Avoid swinging your body.",
      "Control the lowering phase.",
    ],
  },

  {
    id: 29,
    name: "Front Raise",
    muscle: "Shoulders",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "7 min",
    description:
      "An isolation movement targeting the front portion of the shoulders.",
    steps: [
      "Stand upright with dumbbells in front of your thighs.",
      "Keep your arms controlled.",
      "Raise one or both arms forward.",
      "Lift to approximately shoulder height.",
      "Pause briefly.",
      "Lower slowly.",
    ],
    tips: [
      "Avoid using momentum.",
      "Keep your shoulders relaxed.",
      "Use manageable weight.",
    ],
  },

  {
    id: 30,
    name: "Rear Delt Fly",
    muscle: "Shoulders",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "7 min",
    description:
      "An isolation exercise for the rear deltoids and upper back.",
    steps: [
      "Hold dumbbells and hinge forward slightly.",
      "Keep your back neutral.",
      "Let your arms hang below your shoulders.",
      "Raise your arms outward.",
      "Squeeze your rear shoulders.",
      "Lower the dumbbells slowly.",
    ],
    tips: [
      "Keep the movement controlled.",
      "Avoid shrugging your shoulders.",
      "Use lighter weights when needed.",
    ],
  },

  {
    id: 31,
    name: "Upright Row",
    muscle: "Shoulders",
    category: "Strength",
    difficulty: "Intermediate",
    equipment: "Barbell",
    duration: "7 min",
    description:
      "A pulling movement that trains the shoulders and upper back.",
    steps: [
      "Stand upright holding the barbell.",
      "Keep the bar close to your body.",
      "Pull the bar upward with your elbows leading.",
      "Raise to a comfortable height.",
      "Pause briefly.",
      "Lower the bar under control.",
    ],
    tips: [
      "Use a comfortable range of motion.",
      "Avoid excessive weight.",
      "Stop if the movement causes shoulder discomfort.",
    ],
  },

  // =========================
  // ARMS
  // =========================

  {
    id: 32,
    name: "Dumbbell Bicep Curl",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "7 min",
    description:
      "A simple isolation exercise designed to strengthen the biceps.",
    steps: [
      "Stand upright holding dumbbells at your sides.",
      "Keep your elbows close to your body.",
      "Curl the dumbbells toward your shoulders.",
      "Squeeze your biceps at the top.",
      "Lower the dumbbells slowly.",
      "Repeat with control.",
    ],
    tips: [
      "Avoid swinging your body.",
      "Keep your elbows relatively stationary.",
      "Control both phases.",
    ],
  },

  {
    id: 33,
    name: "Hammer Curl",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    duration: "7 min",
    description:
      "A neutral-grip curl that trains the biceps and supporting arm muscles.",
    steps: [
      "Stand holding dumbbells with your palms facing each other.",
      "Keep your elbows near your sides.",
      "Curl the dumbbells upward.",
      "Pause at the top.",
      "Lower them slowly.",
      "Repeat.",
    ],
    tips: [
      "Keep your wrists neutral.",
      "Avoid swinging.",
      "Use controlled repetitions.",
    ],
  },

  {
    id: 34,
    name: "Preacher Curl",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Intermediate",
    equipment: "EZ Bar",
    duration: "8 min",
    description:
      "An arm isolation exercise that provides support through the preacher bench.",
    steps: [
      "Sit at the preacher curl bench.",
      "Place your upper arms against the pad.",
      "Grip the bar securely.",
      "Curl the weight upward.",
      "Squeeze your biceps.",
      "Lower the weight slowly.",
    ],
    tips: [
      "Avoid fully relaxing at the bottom.",
      "Do not use excessive weight.",
      "Keep your upper arms against the pad.",
    ],
  },

  {
    id: 35,
    name: "Concentration Curl",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    duration: "7 min",
    description:
      "A seated single-arm curl that focuses on the biceps.",
    steps: [
      "Sit on a bench with your legs apart.",
      "Rest your upper arm against your inner thigh.",
      "Hold the dumbbell with your palm facing upward.",
      "Curl the weight toward your shoulder.",
      "Squeeze your biceps.",
      "Lower slowly.",
    ],
    tips: [
      "Keep your upper arm stable.",
      "Avoid using your torso.",
      "Perform both sides evenly.",
    ],
  },

  {
    id: 36,
    name: "Tricep Pushdown",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Beginner",
    equipment: "Cable Machine",
    duration: "7 min",
    description:
      "A cable isolation exercise targeting the triceps.",
    steps: [
      "Attach a suitable handle to the cable.",
      "Stand facing the machine.",
      "Keep your elbows close to your sides.",
      "Push the handle downward.",
      "Extend your arms under control.",
      "Return the handle slowly.",
    ],
    tips: [
      "Keep your elbows stable.",
      "Avoid leaning excessively.",
      "Control the return phase.",
    ],
  },

  {
    id: 37,
    name: "Overhead Tricep Extension",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    duration: "8 min",
    description:
      "An overhead movement that trains the triceps through elbow extension.",
    steps: [
      "Hold a dumbbell overhead with both hands.",
      "Keep your elbows pointing forward.",
      "Lower the dumbbell behind your head.",
      "Keep your upper arms relatively stationary.",
      "Extend your elbows to raise the weight.",
      "Repeat under control.",
    ],
    tips: [
      "Keep your core stable.",
      "Avoid flaring your elbows excessively.",
      "Use manageable weight.",
    ],
  },

  {
    id: 38,
    name: "Skull Crushers",
    muscle: "Arms",
    category: "Isolation",
    difficulty: "Intermediate",
    equipment: "EZ Bar",
    duration: "8 min",
    description:
      "A lying triceps exercise performed with an EZ bar or similar weight.",
    steps: [
      "Lie on a bench holding the EZ bar above your chest.",
      "Keep your upper arms relatively stationary.",
      "Bend your elbows to lower the bar.",
      "Lower toward the area above your forehead.",
      "Extend your elbows to raise the bar.",
      "Repeat with control.",
    ],
    tips: [
      "Use a manageable weight.",
      "Keep your elbows controlled.",
      "Consider using a spotter for heavier sets.",
    ],
  },

  {
    id: 39,
    name: "Parallel Bar Dips",
    muscle: "Arms",
    category: "Strength",
    difficulty: "Advanced",
    equipment: "Dip Bars",
    duration: "8 min",
    description:
      "A bodyweight pushing movement that trains the triceps, chest, and shoulders.",
    steps: [
      "Grip the parallel bars and support your body.",
      "Keep your shoulders controlled.",
      "Lower your body by bending your elbows.",
      "Descend to a comfortable depth.",
      "Push through your hands.",
      "Return to the starting position.",
    ],
    tips: [
      "Avoid dropping too quickly.",
      "Keep your shoulders controlled.",
      "Use assisted dips if needed.",
    ],
  },

  // =========================
  // CORE
  // =========================

  {
    id: 40,
    name: "Plank",
    muscle: "Core",
    category: "Core",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    duration: "5 min",
    description:
      "An isometric core exercise that develops trunk stability.",
    steps: [
      "Place your forearms on the floor.",
      "Extend your legs behind you.",
      "Keep your body in a straight line.",
      "Brace your abdominal muscles.",
      "Keep your hips level.",
      "Hold while breathing steadily.",
    ],
    tips: [
      "Do not let your lower back sag.",
      "Keep your neck neutral.",
      "Start with shorter holds if necessary.",
    ],
  },

  {
    id: 41,
    name: "Side Plank",
    muscle: "Core",
    category: "Core",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    duration: "5 min",
    description:
      "A core stability exercise emphasizing the obliques and side abdominal muscles.",
    steps: [
      "Lie on your side with your elbow beneath your shoulder.",
      "Stack or position your feet comfortably.",
      "Lift your hips from the floor.",
      "Keep your body in a straight line.",
      "Brace your core.",
      "Hold and then switch sides.",
    ],
    tips: [
      "Keep your hips elevated.",
      "Avoid rotating your torso.",
      "Build duration gradually.",
    ],
  },

  {
    id: 42,
    name: "Crunches",
    muscle: "Core",
    category: "Core",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    duration: "6 min",
    description:
      "A basic abdominal exercise focusing on controlled trunk flexion.",
    steps: [
      "Lie on your back with your knees bent.",
      "Place your feet comfortably on the floor.",
      "Place your hands lightly behind your head.",
      "Brace your abdominal muscles.",
      "Lift your shoulders slightly from the floor.",
      "Lower yourself slowly.",
    ],
    tips: [
      "Do not pull on your neck.",
      "Focus on controlled movement.",
      "Avoid using momentum.",
    ],
  },

  {
    id: 43,
    name: "Bicycle Crunches",
    muscle: "Core",
    category: "Core",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    duration: "6 min",
    description:
      "A dynamic abdominal exercise involving alternating trunk rotation and leg movement.",
    steps: [
      "Lie on your back with your hands lightly behind your head.",
      "Raise your legs from the floor.",
      "Bring one knee toward your chest.",
      "Rotate your torso toward that knee.",
      "Switch sides in a controlled motion.",
      "Continue alternating.",
    ],
    tips: [
      "Move slowly enough to maintain control.",
      "Avoid pulling your neck.",
      "Keep your lower back controlled.",
    ],
  },

  {
    id: 44,
    name: "Leg Raises",
    muscle: "Core",
    category: "Core",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    duration: "6 min",
    description:
      "A lower-abdominal focused movement using controlled leg lifting.",
    steps: [
      "Lie flat on your back.",
      "Keep your legs extended.",
      "Brace your core.",
      "Raise your legs upward.",
      "Stop at a comfortable height.",
      "Lower them slowly without losing control.",
    ],
    tips: [
      "Avoid arching your lower back.",
      "Use controlled movement.",
      "Bend your knees slightly if necessary.",
    ],
  },

  {
    id: 45,
    name: "Hanging Leg Raise",
    muscle: "Core",
    category: "Core",
    difficulty: "Advanced",
    equipment: "Pull Up Bar",
    duration: "6 min",
    description:
      "A challenging core exercise performed while hanging from a bar.",
    steps: [
      "Hang from a pull-up bar with your arms extended.",
      "Engage your core.",
      "Raise your legs upward.",
      "Lift to a comfortable height.",
      "Lower your legs slowly.",
      "Repeat without excessive swinging.",
    ],
    tips: [
      "Avoid using momentum.",
      "Keep your core engaged.",
      "Use an easier core exercise if needed.",
    ],
  },

  {
    id: 46,
    name: "Russian Twists",
    muscle: "Core",
    category: "Core",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    duration: "6 min",
    description:
      "A rotational core exercise targeting the abdominal and oblique muscles.",
    steps: [
      "Sit on the floor with your knees bent.",
      "Lean your torso back slightly.",
      "Keep your chest lifted.",
      "Rotate your torso toward one side.",
      "Rotate toward the opposite side.",
      "Continue alternating under control.",
    ],
    tips: [
      "Keep your movements controlled.",
      "Avoid excessive twisting.",
      "Keep your core engaged.",
    ],
  },

  {
    id: 47,
    name: "Mountain Climbers",
    muscle: "Core",
    category: "Cardio",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    duration: "6 min",
    description:
      "A dynamic bodyweight movement combining core stability with cardiovascular work.",
    steps: [
      "Start in a high plank position.",
      "Brace your core.",
      "Bring one knee toward your chest.",
      "Return that leg while bringing the opposite knee forward.",
      "Continue alternating.",
      "Maintain a stable upper body.",
    ],
    tips: [
      "Keep your hips controlled.",
      "Start slowly before increasing speed.",
      "Maintain good plank position.",
    ],
  },

  // =========================
  // FULL BODY
  // =========================

  {
    id: 48,
    name: "Burpees",
    muscle: "Full Body",
    category: "Cardio",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    duration: "6 min",
    description:
      "A full-body conditioning movement combining a squat, plank, and jump.",
    steps: [
      "Stand upright with your feet comfortable apart.",
      "Lower into a squat.",
      "Place your hands on the floor.",
      "Move your feet back into a plank position.",
      "Return your feet toward your hands.",
      "Stand or jump upward.",
    ],
    tips: [
      "Maintain control throughout the movement.",
      "Use a step-back variation if needed.",
      "Land softly when jumping.",
    ],
  },

  {
    id: 49,
    name: "Kettlebell Swing",
    muscle: "Full Body",
    category: "Power",
    difficulty: "Intermediate",
    equipment: "Kettlebell",
    duration: "8 min",
    description:
      "A hip-driven movement developing power in the hips, glutes, and posterior chain.",
    steps: [
      "Stand with the kettlebell slightly in front of you.",
      "Hinge at your hips and grip the handle.",
      "Swing the kettlebell between your legs.",
      "Drive your hips forward powerfully.",
      "Allow the kettlebell to swing to chest height.",
      "Guide it back between your legs.",
    ],
    tips: [
      "Drive the movement with your hips.",
      "Do not squat excessively.",
      "Keep your back neutral.",
    ],
  },

  {
    id: 50,
    name: "Dumbbell Goblet Squat",
    muscle: "Full Body",
    category: "Strength",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    duration: "8 min",
    description:
      "A beginner-friendly squat variation using a dumbbell held near the chest.",
    steps: [
      "Hold a dumbbell vertically close to your chest.",
      "Stand with your feet around shoulder width apart.",
      "Brace your core.",
      "Lower into a squat.",
      "Keep your chest controlled.",
      "Drive through your feet to stand.",
    ],
    tips: [
      "Keep the dumbbell close to your chest.",
      "Keep your knees tracking with your toes.",
      "Use a manageable weight.",
    ],
  },
];

const exerciseDetails = {
  1: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Anterior Deltoid", "Triceps"],
    muscleExplanation:
      "The chest is the primary muscle group responsible for the pressing movement. The front shoulders and triceps assist as the weight is pressed upward.",
    commonMistakes: [
      "Bouncing the bar off the chest.",
      "Using excessive weight.",
      "Losing control during the lowering phase.",
      "Incorrect hand or wrist positioning.",
    ],
    videoUrl: "",
  },

  2: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Anterior Deltoid", "Triceps"],
    muscleExplanation:
      "The incline angle places greater emphasis on the upper portion of the chest while the shoulders and triceps assist with the press.",
    commonMistakes: [
      "Setting the bench at an excessively steep angle.",
      "Using too much weight.",
      "Lowering the bar too quickly.",
    ],
    videoUrl: "",
  },

  3: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Anterior Deltoid"],
    muscleExplanation:
      "The decline position emphasizes the lower portion of the chest while the triceps and shoulders contribute to the pressing movement.",
    commonMistakes: [
      "Using excessive weight.",
      "Bouncing the bar.",
      "Losing stable body positioning.",
    ],
    videoUrl: "",
  },

  4: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Anterior Deltoid", "Triceps"],
    muscleExplanation:
      "Dumbbell pressing trains the chest while each arm works independently, allowing a natural pressing path.",
    commonMistakes: [
      "Using weights that are too heavy.",
      "Dropping the dumbbells uncontrolled.",
      "Losing shoulder stability.",
    ],
    videoUrl: "",
  },

  5: {
    primaryMuscles: ["Upper Chest"],
    secondaryMuscles: ["Anterior Deltoid", "Triceps"],
    muscleExplanation:
      "The incline position increases the contribution of the upper chest while the shoulders and triceps assist during the press.",
    commonMistakes: [
      "Using an excessively steep bench angle.",
      "Arching excessively.",
      "Using uncontrolled repetitions.",
    ],
    videoUrl: "",
  },

  6: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Anterior Deltoid"],
    muscleExplanation:
      "The fly movement places the chest through a wide range of motion and emphasizes controlled horizontal arm movement.",
    commonMistakes: [
      "Using excessive weight.",
      "Overstretching at the bottom.",
      "Turning the exercise into a pressing movement.",
    ],
    videoUrl: "",
  },

  7: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Anterior Deltoid", "Triceps"],
    muscleExplanation:
      "Cable resistance provides continuous tension while the chest brings the arms together in front of the body.",
    commonMistakes: [
      "Using momentum.",
      "Standing too far forward.",
      "Losing control during the return.",
    ],
    videoUrl: "",
  },

  8: {
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Anterior Deltoid", "Core"],
    muscleExplanation:
      "Push-ups train the chest through a bodyweight pressing movement while the shoulders, triceps, and core help stabilize the body.",
    commonMistakes: [
      "Letting the hips sag.",
      "Flaring the elbows excessively.",
      "Performing repetitions too quickly.",
    ],
    videoUrl: "",
  },

  9: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Biceps", "Rhomboids"],
    muscleExplanation:
      "Pull-ups primarily train the lats while the biceps and upper-back muscles assist in pulling the body upward.",
    commonMistakes: [
      "Excessive swinging.",
      "Using momentum.",
      "Performing incomplete repetitions.",
    ],
    videoUrl: "",
  },

  10: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Biceps", "Rhomboids"],
    muscleExplanation:
      "The underhand grip increases biceps involvement while still strongly training the lats and upper back.",
    commonMistakes: [
      "Swinging the body.",
      "Using momentum.",
      "Failing to control the descent.",
    ],
    videoUrl: "",
  },

  11: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Biceps", "Rhomboids"],
    muscleExplanation:
      "The lat pulldown trains the large back muscles responsible for pulling the arms downward toward the body.",
    commonMistakes: [
      "Pulling the bar behind the neck.",
      "Leaning excessively backward.",
      "Using momentum.",
    ],
    videoUrl: "",
  },

  12: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Rhomboids", "Biceps", "Trapezius"],
    muscleExplanation:
      "The seated row develops the middle and upper back through horizontal pulling while the arms assist.",
    commonMistakes: [
      "Rounding the back.",
      "Using excessive body movement.",
      "Pulling only with the arms.",
    ],
    videoUrl: "",
  },

  13: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Rhomboids", "Trapezius", "Biceps"],
    muscleExplanation:
      "The bent-over row builds back thickness through a strong horizontal pulling movement.",
    commonMistakes: [
      "Rounding the spine.",
      "Using excessive momentum.",
      "Turning the movement into a shrug.",
    ],
    videoUrl: "",
  },

  14: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Rhomboids", "Biceps"],
    muscleExplanation:
      "The one-arm row allows each side of the back to work independently while emphasizing the lats.",
    commonMistakes: [
      "Rotating the torso.",
      "Pulling toward the shoulder instead of the hip.",
      "Using momentum.",
    ],
    videoUrl: "",
  },

  15: {
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Rhomboids", "Trapezius", "Biceps"],
    muscleExplanation:
      "The T-bar row is a compound pulling movement that develops back thickness and strength.",
    commonMistakes: [
      "Rounding the back.",
      "Jerking the weight.",
      "Using excessive weight.",
    ],
    videoUrl: "",
  },

  16: {
    primaryMuscles: ["Rear Deltoid"],
    secondaryMuscles: ["Rhomboids", "Trapezius"],
    muscleExplanation:
      "Face pulls emphasize the rear shoulders and upper-back muscles and can be useful for developing upper-body pulling strength.",
    commonMistakes: [
      "Using excessive weight.",
      "Pulling only with the arms.",
      "Shrugging excessively.",
    ],
    videoUrl: "",
  },

  17: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Hamstrings", "Core"],
    muscleExplanation:
      "The squat is a compound lower-body movement involving the quadriceps, glutes, hamstrings, and trunk stabilizers.",
    commonMistakes: [
      "Losing balance.",
      "Allowing the knees to collapse inward.",
      "Using more weight than can be controlled.",
    ],
    videoUrl: "",
  },

  18: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Core"],
    muscleExplanation:
      "The front-loaded bar position encourages an upright torso and places significant demand on the quadriceps.",
    commonMistakes: [
      "Dropping the elbows.",
      "Rounding the back.",
      "Using excessive weight.",
    ],
    videoUrl: "",
  },

  19: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Hamstrings"],
    muscleExplanation:
      "The leg press provides a supported way to train the lower body, with the quadriceps and glutes contributing strongly.",
    commonMistakes: [
      "Locking the knees aggressively.",
      "Allowing the lower back to lose contact with the pad.",
      "Using excessive weight.",
    ],
    videoUrl: "",
  },

  20: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: [],
    muscleExplanation:
      "The leg extension isolates the quadriceps by extending the knee against resistance.",
    commonMistakes: [
      "Swinging the weight.",
      "Using excessive resistance.",
      "Performing uncontrolled repetitions.",
    ],
    videoUrl: "",
  },

  21: {
    primaryMuscles: ["Hamstrings"],
    secondaryMuscles: ["Calves"],
    muscleExplanation:
      "The lying leg curl primarily trains the hamstrings by bending the knee against resistance.",
    commonMistakes: [
      "Lifting the hips from the pad.",
      "Using momentum.",
      "Dropping the weight quickly.",
    ],
    videoUrl: "",
  },

  22: {
    primaryMuscles: ["Hamstrings"],
    secondaryMuscles: ["Glutes", "Lower Back"],
    muscleExplanation:
      "The Romanian deadlift emphasizes the posterior chain through controlled hip hinging.",
    commonMistakes: [
      "Rounding the back.",
      "Moving the weight too far away from the legs.",
      "Squatting instead of hinging.",
    ],
    videoUrl: "",
  },

  23: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Hamstrings"],
    muscleExplanation:
      "Walking lunges train each leg independently and challenge balance, strength, and coordination.",
    commonMistakes: [
      "Taking unstable steps.",
      "Allowing the knee to collapse inward.",
      "Moving too quickly.",
    ],
    videoUrl: "",
  },

  24: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Hamstrings"],
    muscleExplanation:
      "The Bulgarian split squat is a unilateral exercise that strongly challenges the working leg and supporting muscles.",
    commonMistakes: [
      "Losing balance.",
      "Using excessive weight.",
      "Allowing the front knee to lose control.",
    ],
    videoUrl: "",
  },

  25: {
    primaryMuscles: ["Gastrocnemius"],
    secondaryMuscles: ["Soleus"],
    muscleExplanation:
      "Calf raises train the muscles of the lower leg through repeated plantarflexion of the ankle.",
    commonMistakes: [
      "Bouncing through repetitions.",
      "Using a partial range of motion.",
      "Moving too quickly.",
    ],
    videoUrl: "",
  },

  26: {
    primaryMuscles: ["Deltoids"],
    secondaryMuscles: ["Triceps", "Upper Chest"],
    muscleExplanation:
      "The shoulder press develops overhead pressing strength with the deltoids as the main movers.",
    commonMistakes: [
      "Excessive lower-back arching.",
      "Using excessive weight.",
      "Lowering the dumbbells too quickly.",
    ],
    videoUrl: "",
  },

  27: {
    primaryMuscles: ["Deltoids"],
    secondaryMuscles: ["Triceps", "Upper Chest"],
    muscleExplanation:
      "The Arnold press combines shoulder rotation with an overhead press to train the deltoids through a larger movement pattern.",
    commonMistakes: [
      "Moving too quickly.",
      "Using excessive weight.",
      "Losing torso stability.",
    ],
    videoUrl: "",
  },

  28: {
    primaryMuscles: ["Lateral Deltoid"],
    secondaryMuscles: ["Anterior Deltoid"],
    muscleExplanation:
      "Lateral raises emphasize the side portion of the shoulders and contribute to shoulder width and strength.",
    commonMistakes: [
      "Swinging the dumbbells.",
      "Using excessive weight.",
      "Shrugging excessively.",
    ],
    videoUrl: "",
  },

  29: {
    primaryMuscles: ["Anterior Deltoid"],
    secondaryMuscles: ["Upper Chest"],
    muscleExplanation:
      "Front raises emphasize the front portion of the shoulders through controlled shoulder flexion.",
    commonMistakes: [
      "Swinging the weight.",
      "Using excessive weight.",
      "Lifting far beyond a comfortable range.",
    ],
    videoUrl: "",
  },

  30: {
    primaryMuscles: ["Rear Deltoid"],
    secondaryMuscles: ["Rhomboids", "Trapezius"],
    muscleExplanation:
      "The rear delt fly targets the back portion of the shoulders while the upper back assists in stabilizing the movement.",
    commonMistakes: [
      "Using excessive weight.",
      "Shrugging.",
      "Using momentum.",
    ],
    videoUrl: "",
  },

  31: {
    primaryMuscles: ["Deltoids"],
    secondaryMuscles: ["Trapezius"],
    muscleExplanation:
      "The upright row involves the shoulders and upper back during a controlled upward pulling motion.",
    commonMistakes: [
      "Using excessive weight.",
      "Forcing an uncomfortable range of motion.",
      "Using momentum.",
    ],
    videoUrl: "",
  },

  32: {
    primaryMuscles: ["Biceps Brachii"],
    secondaryMuscles: ["Brachialis", "Forearms"],
    muscleExplanation:
      "The bicep curl directly trains the elbow flexors, particularly the biceps.",
    commonMistakes: [
      "Swinging the torso.",
      "Moving the elbows excessively.",
      "Dropping the weights quickly.",
    ],
    videoUrl: "",
  },

  33: {
    primaryMuscles: ["Brachialis"],
    secondaryMuscles: ["Biceps", "Brachioradialis"],
    muscleExplanation:
      "The hammer curl uses a neutral grip and trains the biceps along with supporting forearm muscles.",
    commonMistakes: [
      "Swinging the body.",
      "Moving the elbows forward excessively.",
      "Using excessive weight.",
    ],
    videoUrl: "",
  },

  34: {
    primaryMuscles: ["Biceps Brachii"],
    secondaryMuscles: ["Brachialis"],
    muscleExplanation:
      "The preacher curl provides upper-arm support and focuses the movement on elbow flexion.",
    commonMistakes: [
      "Using excessive weight.",
      "Dropping the weight quickly.",
      "Lifting the upper arm from the pad.",
    ],
    videoUrl: "",
  },

  35: {
    primaryMuscles: ["Biceps Brachii"],
    secondaryMuscles: ["Brachialis"],
    muscleExplanation:
      "The concentration curl isolates one arm at a time and emphasizes the biceps during elbow flexion.",
    commonMistakes: [
      "Using body momentum.",
      "Moving the upper arm.",
      "Rushing the repetitions.",
    ],
    videoUrl: "",
  },

  36: {
    primaryMuscles: ["Triceps"],
    secondaryMuscles: [],
    muscleExplanation:
      "The triceps are responsible for extending the elbow, making them the primary muscle group during the pushdown.",
    commonMistakes: [
      "Moving the elbows excessively.",
      "Leaning heavily into the movement.",
      "Using momentum.",
    ],
    videoUrl: "",
  },

  37: {
    primaryMuscles: ["Triceps"],
    secondaryMuscles: ["Core"],
    muscleExplanation:
      "The overhead position places the triceps through a long range of motion during elbow extension.",
    commonMistakes: [
      "Flaring the elbows excessively.",
      "Using excessive weight.",
      "Arching the lower back.",
    ],
    videoUrl: "",
  },

  38: {
    primaryMuscles: ["Triceps"],
    secondaryMuscles: [],
    muscleExplanation:
      "Skull crushers directly train the triceps through controlled elbow extension while lying on a bench.",
    commonMistakes: [
      "Using excessive weight.",
      "Moving the upper arms excessively.",
      "Lowering the weight without control.",
    ],
    videoUrl: "",
  },

  39: {
    primaryMuscles: ["Triceps"],
    secondaryMuscles: ["Pectoralis Major", "Anterior Deltoid"],
    muscleExplanation:
      "Dips are a compound pushing movement that can strongly involve the triceps along with the chest and shoulders.",
    commonMistakes: [
      "Dropping too quickly.",
      "Losing shoulder control.",
      "Using a range of motion that cannot be controlled.",
    ],
    videoUrl: "",
  },

  40: {
    primaryMuscles: ["Rectus Abdominis"],
    secondaryMuscles: ["Transverse Abdominis"],
    muscleExplanation:
      "The plank develops core stability by requiring the abdominal and trunk muscles to maintain a strong body position.",
    commonMistakes: [
      "Letting the hips sag.",
      "Raising the hips too high.",
      "Holding the breath.",
    ],
    videoUrl: "",
  },

  41: {
    primaryMuscles: ["Obliques"],
    secondaryMuscles: ["Transverse Abdominis", "Rectus Abdominis"],
    muscleExplanation:
      "The side plank emphasizes the muscles along the side of the trunk while challenging overall core stability.",
    commonMistakes: [
      "Allowing the hips to drop.",
      "Rotating the torso.",
      "Holding the breath.",
    ],
    videoUrl: "",
  },

  42: {
    primaryMuscles: ["Rectus Abdominis"],
    secondaryMuscles: ["Obliques"],
    muscleExplanation:
      "Crunches focus on controlled trunk flexion and primarily train the abdominal muscles.",
    commonMistakes: [
      "Pulling on the neck.",
      "Using momentum.",
      "Performing excessively fast repetitions.",
    ],
    videoUrl: "",
  },

  43: {
    primaryMuscles: ["Rectus Abdominis"],
    secondaryMuscles: ["Obliques"],
    muscleExplanation:
      "Bicycle crunches combine trunk flexion and rotation to challenge the abdominal and oblique muscles.",
    commonMistakes: [
      "Pulling on the neck.",
      "Moving too quickly.",
      "Using limited trunk rotation.",
    ],
    videoUrl: "",
  },

  44: {
    primaryMuscles: ["Rectus Abdominis"],
    secondaryMuscles: ["Hip Flexors"],
    muscleExplanation:
      "Leg raises challenge the core while the hip flexors contribute to lifting the legs.",
    commonMistakes: [
      "Arching the lower back.",
      "Using momentum.",
      "Dropping the legs quickly.",
    ],
    videoUrl: "",
  },

  45: {
    primaryMuscles: ["Rectus Abdominis"],
    secondaryMuscles: ["Hip Flexors", "Obliques"],
    muscleExplanation:
      "Hanging leg raises challenge the abdominal muscles while the hip flexors help raise the legs.",
    commonMistakes: [
      "Swinging the body.",
      "Using momentum.",
      "Dropping the legs uncontrolled.",
    ],
    videoUrl: "",
  },

  46: {
    primaryMuscles: ["Obliques"],
    secondaryMuscles: ["Rectus Abdominis", "Hip Flexors"],
    muscleExplanation:
      "Russian twists use controlled trunk rotation to challenge the obliques and other core muscles.",
    commonMistakes: [
      "Moving too quickly.",
      "Excessive spinal rotation.",
      "Using weight that cannot be controlled.",
    ],
    videoUrl: "",
  },

  47: {
    primaryMuscles: ["Rectus Abdominis"],
    secondaryMuscles: ["Shoulders", "Hip Flexors"],
    muscleExplanation:
      "Mountain climbers combine plank stability with alternating leg movement to challenge the core and cardiovascular system.",
    commonMistakes: [
      "Raising the hips excessively.",
      "Losing plank position.",
      "Moving too quickly without control.",
    ],
    videoUrl: "",
  },

  48: {
    primaryMuscles: ["Full Body"],
    secondaryMuscles: ["Core", "Legs", "Shoulders"],
    muscleExplanation:
      "Burpees combine several bodyweight movements and challenge the legs, upper body, core, and cardiovascular system.",
    commonMistakes: [
      "Landing heavily.",
      "Losing control during the plank portion.",
      "Rushing through the movement.",
    ],
    videoUrl: "",
  },

  49: {
    primaryMuscles: ["Glutes"],
    secondaryMuscles: ["Hamstrings", "Core", "Shoulders"],
    muscleExplanation:
      "The kettlebell swing is primarily driven by the hips and develops power through the glutes and posterior chain.",
    commonMistakes: [
      "Squatting instead of hinging.",
      "Lifting with the arms.",
      "Rounding the back.",
    ],
    videoUrl: "",
  },

  50: {
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Hamstrings", "Core"],
    muscleExplanation:
      "The goblet squat is a beginner-friendly compound movement that trains the lower body while encouraging an upright torso.",
    commonMistakes: [
      "Allowing the knees to collapse inward.",
      "Lifting the heels.",
      "Using excessive weight.",
    ],
    videoUrl: "",
  },
};

const completeExercises = exercises.map((exercise) => ({
  ...exercise,
  ...(exerciseDetails[exercise.id] || {}),
}));

export default completeExercises;