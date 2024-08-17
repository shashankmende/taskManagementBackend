
const taskModel = require('../model/taskModel')




const createTask = async (req, res) => {
    const { taskName, description, status, assignee, dueDate } = req.body;

    try {
        
        const newTask = new taskModel({
            taskName,
            description,
            status, 
            assignee,
            dueDate: new Date(dueDate) 
        });

        
        await newTask.save();

        
        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        
        res.status(400).json({
            error: error.message
        });
    }
};

const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    console.log("taski id",taskId)

    try {
        // Find the task by its ID
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        // Send the task details as a response
        res.status(200).send({ task });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: 'An error occurred while fetching the task', details: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await taskModel.find();

        // Send the tasks in the response
        res.status(200).json({ tasks });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: "An error occurred while fetching the tasks", details: error.message });
    }
}


module.exports = {
    createTask,
    getTaskById,
    getAllTasks
};


