import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert("Failed to delete task.");
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <table>
            <tr>
              <td>
                <b>Intake Id: </b>
              </td>
              <td> </td>
              <td>{task.intakeId}</td>
            </tr>
            <tr>
              <td>
                <b>Product Name: </b>
              </td>
              <td> </td>
              <td>{task.productName}</td>
            </tr>
            <tr>
              <td>
                <b>Amount: </b>
              </td>
              <td> </td>
              <td>{task.productAmount}</td>
            </tr>
            <tr>
              <td>
                <b>Description: </b>
              </td>
              <td> </td>
              <td>{task.description}</td>
            </tr>
            <tr>
              <td>
                <b>Storage Space: </b>
              </td>
              <td> </td>
              <td>{task.storageRack}</td>
            </tr>
            <tr>
              <td>
                <b>Shipment Id: </b>
              </td>
              <td> </td>
              <td>{task.shipmentId}</td>
            </tr>
            <tr>
              <td>
                <b>Shipment Date: </b>
              </td>
              <td> </td>
              <td>{new Date(task.shipmentTime).toLocaleDateString()}</td>
            </tr>
          </table>
          {/* <p>
            <b>Product Intake Id: </b>
            {task.intakeId}
          </p>
          <p>
            <b>Product Name: </b>
            {task.productName}
          </p>
          <p>Amount: {task.productAmount}</p>
          <p>{task.description}</p>
          <p>{task.storageRack}</p>
          <p>{task.shipmentId}</p>
          <p className="text-sm text-gray-500">
            Shipment Date: {new Date(task.shipmentTime).toLocaleDateString()}
          </p> */}
          <div className="mt-2">
            <button
              onClick={() => setEditingTask(task)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Add Details to Product
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Product
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Complete Shipment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
