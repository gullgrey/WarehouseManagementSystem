const Task = require("../models/Task");
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  const {
    intakeId,
    productName,
    productAmount,
    description,
    storageRack,
    shipmentId,
    shipmentTime,
  } = req.body;
  try {
    const task = await Task.create({
      userId: req.user.id,
      intakeId,
      productName,
      productAmount,
      description,
      storageRack,
      shipmentId,
      shipmentTime,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const {
    intakeId,
    productName,
    productAmount,
    description,
    completed,
    storageRack,
    shipmentId,
    shipmentTime,
  } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Product not found" });
    task.intakeId = intakeId || task.intakeId;
    task.productName = productName || task.productName;
    task.productAmount = productAmount || task.productAmount;
    task.description = description || task.description;
    task.completed = completed ?? task.completed;
    task.storageRack = storageRack || task.storageRack;
    task.shipmentId = shipmentId || task.shipmentId;
    task.shipmentTime = shipmentTime || task.shipmentTime;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getTasks, addTask, updateTask, deleteTask };
