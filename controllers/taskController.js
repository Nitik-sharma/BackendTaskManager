import Task from "../models/Task.js";

/**
 * @desc Create new task
 * @route POST /api/tasks
 */
export const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,

      // createdBy from JWT
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/**
 * @desc Get all tasks (filter + sort + pagination)
 * @route GET /api/tasks
 * Example:
 * /api/tasks?status=pending&priority=high&sort=dueDate&order=asc&page=1&limit=10
 */
export const getTasks = async (req, res) => {

  try {

    const {
      status,
      priority,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10
    } = req.query;

    // filter object
    const filter = {
      createdBy: req.user.id
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // sort object
    const sortOrder = order === "asc" ? 1 : -1;

    const sortObj = {
      [sort]: sortOrder
    };

    // pagination
    const skip = (page - 1) * limit;

    // INTENTIONAL BUG: limit is string, not converted to Number
    const tasks = await Task.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      count: tasks.length,
      total,
      page: Number(page),
      data: tasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/**
 * @desc Update task
 * @route PUT /api/tasks/:id
 */
export const updateTask = async (req, res) => {

  try {

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id
      },
      req.body,
      {
        new: true
      }
    );

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });

    res.json({
      success: true,
      data: task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/**
 * @desc Delete task
 * @route DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res) => {

  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });

    res.json({
      success: true,
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
