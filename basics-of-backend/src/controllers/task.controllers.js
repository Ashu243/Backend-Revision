const Task = require("../models/task.models");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


const CreateTask = asyncHandler(async(req, res)=>{
    const {title, description} = req.body
    if(!title || !description) throw new ApiError(400, "Title or Description is missing")
    
    const user = req.user._id

    const task = await Task.create({
        title,
        description,
        user
    })
    

    return res
    .status(201)
    .json(
        new ApiResponse(201, "Task Created", task)
    )

})


const getTasks = asyncHandler(async(req, res)=>{
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const search = req.query.search
    const completed = req.query.completed

    const skip = (page - 1) * limit
    const filter = {user: req.user._id}

    if(search){
        filter.title = {$regex: search, $options: 'i'}
    }


    const totalTasks = await Task.countDocuments({user: req.user._id})

    const tasks = await Task.find(filter)
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)

    return res
    .status(200)
    .json(
        new ApiResponse(200, "tasks fetched successfully", {
            tasks,
            totalTasks,
            totalPages: Math.ceil(totalTasks/ limit),
            currentPage: page
        })
    )
})


const updateTask = asyncHandler(async(req, res)=>{
    const taskId = req.params.id
    if(!taskId) throw new ApiError(404, "TaskId not found")
    
    const {title, description} = req.body
    if(!title || !description) throw new ApiError(404, "Title or Description is required")

    const task = await Task.findOneAndUpdate({_id: taskId, user: req.user._id},
        {title, description}, {new: true})
    if(!task) throw new ApiError(404, "Task not found")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Task updated Successfully", task)
    )
    
})

const deleteTask = asyncHandler(async(req, res)=>{
    const taskId = req.params.id
    if(!taskId) throw new ApiError(404, "TaskId not found")
    
    const task = await Task.findOneAndDelete({_id: taskId, user: req.user._id})
    if(!task) throw new ApiError(404, "Task Not Found")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Task Deleted Successfully", task)
    )
})



module.exports = {CreateTask, getTasks, updateTask, deleteTask}