const workouts = [
  {
    id: 1,
    name: "Beginner Full Body",
    category: "Full Body",
    level: "Beginner",
    duration: "45 min",
    daysPerWeek: "3 days / week",
    description:
      "A balanced full-body workout designed for beginners who want to build strength, improve movement, and establish a consistent gym routine.",
    focus: ["Full Body", "Strength", "Foundation"],
    exercises: [17, 4, 13, 26, 32, 40],
  },

  {
    id: 2,
    name: "Push Day",
    category: "Push",
    level: "Intermediate",
    duration: "50 min",
    daysPerWeek: "1 day / week",
    description:
      "A focused push workout targeting the chest, shoulders, and triceps with a combination of compound and isolation movements.",
    focus: ["Chest", "Shoulders", "Triceps"],
    exercises: [1, 2, 26, 28, 36, 37],
  },

  {
    id: 3,
    name: "Pull Day",
    category: "Pull",
    level: "Intermediate",
    duration: "50 min",
    daysPerWeek: "1 day / week",
    description:
      "A complete pulling workout designed to train the back, rear delts, and biceps.",
    focus: ["Back", "Biceps", "Rear Delts"],
    exercises: [9, 11, 13, 16, 32, 33],
  },

  {
    id: 4,
    name: "Leg Day",
    category: "Legs",
    level: "Intermediate",
    duration: "55 min",
    daysPerWeek: "1 day / week",
    description:
      "A lower-body focused workout covering the major leg muscles with compound and isolation exercises.",
    focus: ["Quads", "Hamstrings", "Glutes", "Calves"],
    exercises: [17, 19, 20, 21, 23, 25],
  },

  {
    id: 5,
    name: "Upper Body",
    category: "Upper Body",
    level: "Beginner",
    duration: "45 min",
    daysPerWeek: "2 days / week",
    description:
      "A balanced upper-body workout covering the chest, back, shoulders, and arms.",
    focus: ["Chest", "Back", "Shoulders", "Arms"],
    exercises: [4, 9, 26, 28, 32, 36],
  },

  {
    id: 6,
    name: "Core & Conditioning",
    category: "Core",
    level: "Beginner",
    duration: "30 min",
    daysPerWeek: "2–3 days / week",
    description:
      "A core-focused session combining abdominal exercises with conditioning movements.",
    focus: ["Core", "Conditioning", "Endurance"],
    exercises: [40, 41, 43, 44, 47, 48],
  },

  {
    id: 7,
    name: "Strength Builder",
    category: "Strength",
    level: "Advanced",
    duration: "60 min",
    daysPerWeek: "4 days / week",
    description:
      "A strength-oriented workout built around major compound movements and supporting exercises.",
    focus: ["Strength", "Compound Lifts", "Progressive Overload"],
    exercises: [1, 17, 13, 26, 22, 39],
  },

  {
    id: 8,
    name: "Home Workout",
    category: "Home",
    level: "Beginner",
    duration: "30 min",
    daysPerWeek: "3 days / week",
    description:
      "A simple equipment-free workout that can be performed at home or anywhere with limited space.",
    focus: ["Bodyweight", "Full Body", "Conditioning"],
    exercises: [8, 40, 42, 43, 47, 48],
  },
];

export default workouts;