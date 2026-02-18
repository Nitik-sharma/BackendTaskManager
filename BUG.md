Description of the Bug
The PUT /api/tasks/:id endpoint allows a user to save a task with an invalid priority or status, even though those fields are defined as enum in the Mongoose schema.

In Mongoose, findByIdAndUpdate does not run schema validators by default. If a user sends a request with {"priority": "URGENT"} (which is not in our ["low", "medium", "high"] enum), the database will accept and save this "garbage" data. This breaks the front-end's ability to display the task correctly and corrupts the data integrity of the system.

2. Location in Code
File: src/controllers/taskController.js

Function: updateTask

Line: ~54

JavaScript
// Current Vulnerable Code
const updatedTask = await Task.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true } // Missing the 'runValidators' option!
);
3. The Correct Fix
To fix this, we must explicitly tell Mongoose to run the schema validators during an update by passing the { runValidators: true } option. Additionally, we should check if the task belongs to the user before updating to prevent unauthorized access.

The Fixed Code:
JavaScript
const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id }, // Security: Check ownership
    req.body, 
    { 
        new: true, 
        runValidators: true, // Fix: Ensures enum/required checks run on PUT
        context: 'query'     // Necessary for some complex Mongoose validations
    }
);

if (!updatedTask) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
}
4. Why This Matters
Data integrity is the backbone of any professional API. If the backend accepts "URGENT" when the system only knows "high," any filtering or sorting logic (like GET /api/tasks?priority=high) will fail to return that task. It demonstrates a deep understanding of how Mongoose interacts with MongoDB—knowing that "Schema definitions" and "Update queries" behave differently.