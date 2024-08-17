const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        unique: true,
        required: [true, 'Task name is required'],
        trim: true, // Removes surrounding whitespace
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
    },
    status: {
        type: String,


        enum: ['IN_PROGRESS', 'To_Do',"REVIEW", 'DONE'], // Only allow these values
        default: 'pending', // Set default status
        required: true,
    },
    assignee: {
        type: String, // Consider ObjectId if referencing a User model
        required: [true, 'Assignee is required'],
    },
    dueDate: {
        type: Date, // Use Date type for better date handling
        required: [true, 'Due date is required'],
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
