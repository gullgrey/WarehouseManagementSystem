import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    intakeId: "",
    productName: "",
    productAmount: "",
    description: "",
    storageRack: "",
    shipmentId: "",
    shipmentTime: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        intakeId: editingTask.intakeId,
        productName: editingTask.productName,
        productAmount: editingTask.productAmount,
        description: editingTask.description,
        storageRack: editingTask.storageRack,
        shipmentId: editingTask.shipmentId,
        shipmentTime: editingTask.shipmentTime,
      });
    } else {
      setFormData({
        intakeId: "",
        productName: "",
        productAmount: "",
        description: "",
        storageRack: "",
        shipmentId: "",
        shipmentTime: "",
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(
          `/api/tasks/${editingTask._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setTasks(
          tasks.map((task) =>
            task._id === response.data._id ? response.data : task
          )
        );
      } else {
        const response = await axiosInstance.post("/api/tasks", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({
        intakeId: "",
        productName: "",
        productAmount: "",
        description: "",
        storageRack: "",
        shipmentId: "",
        shipmentTime: "",
      });
    } catch (error) {
      alert("Failed to save task.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6"
    >
      <h1 className="text-2xl font-bold mb-4">
        {editingTask
          ? "Warehouse Inventory: Update Product Details"
          : "Warehouse Inventory: Add A New Product"}
      </h1>
      <input
        type="text"
        placeholder="Product Intake Id"
        value={formData.intakeId}
        onChange={(e) => setFormData({ ...formData, intakeId: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Name of Product"
        value={formData.productName}
        onChange={(e) =>
          setFormData({ ...formData, productName: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Amount Received"
        value={formData.productAmount}
        onChange={(e) =>
          setFormData({ ...formData, productAmount: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Product Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <h3 className="text font-bold mb-4">{"Assigned Storage Space"}</h3>

      <select
        value={formData.storageRack}
        onChange={(e) =>
          setFormData({ ...formData, storageRack: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Unassigned">Unassigned</option>
        <option value="Rack A - Section 1">Rack A - Section 1</option>
        <option value="Rack A - Section 2">Rack A - Section 2</option>
        <option value="Rack A - Section 3">Rack A - Section 3</option>
        <option value="Rack A - Section 4">Rack A - Section 4</option>
        <option value="Rack B - Section 1">Rack B - Section 1</option>
        <option value="Rack B - Section 2">Rack B - Section 2</option>
        <option value="Rack B - Section 3">Rack B - Section 3</option>
        <option value="Rack B - Section 4">Rack B - Section 4</option>
        <option value="Rack C - Section 1">Rack C - Section 1</option>
        <option value="Rack C - Section 2">Rack C - Section 2</option>
        <option value="Rack C - Section 3">Rack C - Section 3</option>
        <option value="Rack C - Section 4">Rack C - Section 4</option>
        <option value="Rack D - Section 1">Rack D - Section 1</option>
        <option value="Rack D - Section 2">Rack D - Section 2</option>
        <option value="Rack D - Section 3">Rack D - Section 3</option>
        <option value="Rack D - Section 4">Rack D - Section 4</option>
        <option value="Rack E - Section 1">Rack E - Section 1</option>
        <option value="Rack E - Section 2">Rack E - Section 2</option>
        <option value="Rack E - Section 3">Rack E - Section 3</option>
        <option value="Rack E - Section 4">Rack E - Section 4</option>
        <option value="Rack F - Section 1">Rack F - Section 1</option>
        <option value="Rack F - Section 2">Rack F - Section 2</option>
        <option value="Rack F - Section 3">Rack F - Section 3</option>
        <option value="Rack F - Section 4">Rack F - Section 4</option>
        <option value="Coldroom A - Section 1">Coldroom A - Section 1</option>
        <option value="Coldroom A - Section 2">Coldroom A - Section 2</option>
        <option value="Coldroom A - Section 3">Coldroom A - Section 3</option>
        <option value="Coldroom A - Section 4">Coldroom A - Section 4</option>
        <option value="Coldroom B - Section 1">Coldroom B - Section 1</option>
        <option value="Coldroom B - Section 2">Coldroom B - Section 2</option>
        <option value="Coldroom B - Section 3">Coldroom B - Section 3</option>
        <option value="Coldroom B - Section 4">Coldroom B - Section 4</option>
      </select>
      <h3 className="text font-bold mb-4">{"Shipment Details"}</h3>
      <input
        type="text"
        placeholder="Shipment ID"
        value={formData.shipmentId}
        onChange={(e) =>
          setFormData({ ...formData, shipmentId: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.shipmentTime}
        onChange={(e) =>
          setFormData({ ...formData, shipmentTime: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {editingTask ? "Update Product Details" : "Add Product to Inventory"}
      </button>
    </form>
  );
};

export default TaskForm;
