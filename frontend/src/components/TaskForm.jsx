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
          ? "Your Form Name: Edit Operation"
          : "Your Form Name: Create Operation"}
      </h1>
      <input
        type="text"
        placeholder="intakeId"
        value={formData.intakeId}
        onChange={(e) => setFormData({ ...formData, intakeId: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="productName"
        value={formData.productName}
        onChange={(e) =>
          setFormData({ ...formData, productName: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="productAmount"
        value={formData.productAmount}
        onChange={(e) =>
          setFormData({ ...formData, productAmount: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      {/* <input
        type="text"
        placeholder="storageRack"
        value={formData.storageRack}
        onChange={(e) =>
          setFormData({ ...formData, storageRack: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      /> */}
      <select
        value={formData.storageRack}
        onChange={(e) =>
          setFormData({ ...formData, storageRack: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="someOption">Some option</option>
        <option value="otherOption">Other option</option>
      </select>
      <input
        type="text"
        placeholder="shipmentId"
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
        {editingTask ? "Update Button" : "Create Button"}
      </button>
    </form>
  );
};

export default TaskForm;
