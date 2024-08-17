
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
    const { id } = req.params; 
    console.log("task id", id);

    try {
        
        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        
        res.status(200).send({ task });
    } catch (error) {
        
        console.error("Error fetching task:", error);
        res.status(500).send({ error: 'An error occurred while fetching the task', details: error.message });
    }
};



const getAllTasks = async (req, res) => {
    try {
        
        const tasks = await taskModel.find();

        
        res.status(200).json({ tasks });
    } catch (error) {
        
        res.status(500).json({ error: "An error occurred while fetching the tasks", details: error.message });
    }
}


const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        
        const deletedTask = await taskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            
            return res.status(404).json({ message: 'Task not found' });
        }

        
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        
        res.status(500).json({ error: 'An error occurred while deleting the task', details: error.message });
    }
};

const filterTasks =async(req,res)=>{
    res.send("we are in filtere contorller")
    try {
        const {status}=req.query
        console.log("statsu",status)

        const tasks = await taskModel.find({status})

        res.send({message:"Successfully retrieved Filtered List",tasks:tasks})
    } catch (error) {
        res.status(500).send("Internal Server Error :",error)
    }
}



const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = req.body;

        const task = await taskModel.findByIdAndUpdate(id, updatedTask, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    deleteTask,
    filterTasks,
    
    updateTask
};


