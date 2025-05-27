import { useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import { fetchGoals, createGoal, updateGoalStatus, deleteGoal } from "../../service/api";

export default function GoalsTable({ token, semester, week }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalSubject, setNewGoalSubject] = useState("");
  const [newGoalDeadline, setNewGoalDeadline] = useState("");
  const [newGoalCompleted, setNewGoalCompleted] = useState(false);
const handleAddGoal = async (newGoal) => {
  try {
    const token = localStorage.getItem("token");

    // Bạn cần nhập thêm 'title' và 'deadline' khi tạo mục tiêu
    // Giả sử tạm thời title giống description, deadline là ngày hiện tại hoặc user nhập
    const goalData = {
      title: newGoal.description,      // hoặc bạn có thể thêm input riêng để nhập title
      description: newGoal.description,
      semester,
      week,
      deadline: newGoal.deadline || new Date().toISOString().split("T")[0], // ngày hiện tại, định dạng "YYYY-MM-DD"
      subject: newGoal.subject || null,
    };

    const res = await createGoal(goalData, token);

    setGoals((prevGoals) => [...prevGoals, res.data.data]);
    setNewGoalDescription("");
  } catch (error) {
    if (error.response) {
      console.error("Failed to add goal:", error.response.data);
    } else {
      console.error("Failed to add goal:", error.message);
    }
  }
};
  // Các hàm handleAddGoal, toggleCompleted, handleDeleteGoal giữ nguyên hoặc sửa nếu cần
const toggleCompleted = (goalId) => {
  // TODO: Gọi API để cập nhật trạng thái hoàn thành của goal
  console.log("Toggled goal:", goalId);
};
useEffect(() => {

  const loadGoals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Lấy token ngay trong useEffect
      const res = await fetchGoals(token, semester, week);
      setGoals(res.data.data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    } finally {
      setLoading(false);
    }
  };

  loadGoals();
}, [token, semester, week]);

const handleDeleteGoal = (goalId) => {
  // TODO: Gọi API để xóa goal
  console.log("Deleted goal:", goalId);
};


  return (
    <div>
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Deadline</th>
              <th className="border border-gray-300 p-2">Completed</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id} className="border border-gray-300">
                <td className="p-2">{goal.description}</td>
                <td className="p-2">{goal.subject || "-"}</td>
                <td className="p-2">{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : "-"}</td>
                <td
                  className="p-2 text-center cursor-pointer"
                  onClick={() => toggleCompleted(goal.id, goal.completed)}
                >
                  {goal.completed ? (
                    <Check className="inline-block w-5 h-5 text-green-600" />
                  ) : (
                    <input type="checkbox" readOnly />
                  )}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Row thêm goal */}
            <tr>
              <td className="p-2">
    <input
      type="text"
      value={newGoalDescription}
      onChange={(e) => setNewGoalDescription(e.target.value)}
      placeholder="New goal description"
      className="w-full border border-gray-400 rounded p-1"
    />
  </td>
  <td className="p-2">
    <input
      type="text"
      value={newGoalSubject}
      onChange={(e) => setNewGoalSubject(e.target.value)}
      placeholder="Subject"
      className="w-full border border-gray-400 rounded p-1"
    />
  </td>
  <td className="p-2">
    <input
      type="date"
      value={newGoalDeadline}
      onChange={(e) => setNewGoalDeadline(e.target.value)}
      className="w-full border border-gray-400 rounded p-1"
    />
  </td>
  <td className="p-2 text-center">
    <input
      type="checkbox"
      checked={newGoalCompleted}
      onChange={(e) => setNewGoalCompleted(e.target.checked)}
    />
  </td>
  <td className="p-2 text-center">
    <button
      onClick={() => handleAddGoal({
        description: newGoalDescription,
        subject: newGoalSubject,
        deadline: newGoalDeadline,
        completed: newGoalCompleted,
      })}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      <Plus className="inline-block w-4 h-4 mr-1" /> Add
    </button>
  </td>
</tr>
          </tbody>
        </table>
      )}
    </div>
  );
}