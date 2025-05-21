import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api"
const INCLASS_PLANS_URL = `${API_BASE_URL}/student/inclass-plans`
export const createGoal = async (formData, token) => {
  return axios.post(
    `${API_BASE_URL}/goals`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
export const fetchGoals = (token) =>
  axios.get(`${API_BASE_URL}/goals`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const updateGoalStatus = (goalID, data, token) =>
  axios.put(`${API_BASE_URL}/goals/${goalID}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

export const deleteGoal = (id, token) =>
  axios.delete(`${API_BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const editGoal = (updatedGoal, token) =>
  axios.put(`${API_BASE_URL}/${updatedGoal.goalID || updatedGoal.id}`, updatedGoal, {
    headers: { Authorization: `Bearer ${token}` },
  })

  
// Self-study (inclass-plans) APIs
export const getSelfStudyPlans = (semester, token) =>
  axios.get(`${INCLASS_PLANS_URL}/semester/${semester}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const createSelfStudyPlan = (data, token) =>
  axios.post(INCLASS_PLANS_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const updateSelfStudyPlan = (id, data, token) =>
  axios.put(`${INCLASS_PLANS_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const deleteSelfStudyPlan = (id, token) =>
  axios.delete(`${INCLASS_PLANS_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
