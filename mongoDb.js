// Abfangen des Errors der main() function:
// main().catch((err) => console.log(err));

// Asynchrone Funktion:

// async function main() {
// Connection zur MongoDB
//   await mongoose.connect("mongodb://localhost:27017/to_do");

//Schema-Definition:

// const todoSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   creationDate: {
//     type: Date,
//     default: Date.now,
//   },
//   completionDate: Date,
//   priority: {
//     type: String,
//     enum: ["high", "medium", "low", "none"],
//     default: "none",
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Task = mongoose.model("Task", todoSchema);

// //   Erstellen eines neuen Tasks:

//   const testTask = new Task({
//     description: "I am a test task Nr 4",
//     creationDate: "2023-01-16",
//     completionDate: "2023-01-19",
//     completed: true,
//   });
//   await testTask.save();
//   console.log(testTask.description);

// Alle Tasks in der MongoDB auslesen und nach "completionDate" sortiert zurück ausgeben:

//   const tasks = await Task.find().sort({ completionDate: 1 });
//   console.log(tasks);
// }
