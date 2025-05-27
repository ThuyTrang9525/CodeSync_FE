"use client";

import { useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import { fetchGoals, createGoal, updateGoalStatus, deleteGoal } from "../../service/api";
const USER_ID = localStorage.getItem("userId");
const token = localStorage.getItem("token");
export default function GoalsTable({ token }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newGoalDescription, setNewGoalDescription] = useState("");

  useEffect(() => {
    if (!token) return;

    const loadGoals = async () => {
      setLoading(true);
      try {
        const res = await fetchGoals(token);
        setGoals(res.data.data); // Giả sử API trả về dạng { data: { data: [...] } }
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [token]);

  const handleAddGoal = async () => {
    if (!newGoalDescription.trim()) return;

    try {
      const newGoalData = {
        description: newGoalDescription,
        // có thể thêm các trường khác như subject, deadline, completed nếu API yêu cầu
        completed: false,
      };
      const res = await createGoal(newGoalData, token);
      setGoals(prev => [...prev, res.data.data]);
      setNewGoalDescription("");
    } catch (error) {
      console.error("Failed to add goal:", error);
    }
  };

  const toggleCompleted = async (goalId, currentStatus) => {
    try {
      const updatedData = { completed: !currentStatus };
      const res = await updateGoalStatus(goalId, updatedData, token);
      // Cập nhật local state
      setGoals(prev =>
        prev.map(goal => (goal.id === goalId ? { ...goal, completed: res.data.data.completed } : goal))
      );
    } catch (error) {
      console.error("Failed to update goal status:", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId, token);
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
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
              <td className="p-2" colSpan={4}>
                <input
                  type="text"
                  value={newGoalDescription}
                  onChange={(e) => setNewGoalDescription(e.target.value)}
                  placeholder="New goal description"
                  className="w-full border border-gray-400 rounded p-1"
                />
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={handleAddGoal}
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
