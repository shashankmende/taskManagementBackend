const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        unique: true,
        required: true,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
       
        required: true,
    },
    assignee: {
        type: String,
        required: [true, 'Assignee is required'],
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    },
}, {
    timestamps: true 
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;
