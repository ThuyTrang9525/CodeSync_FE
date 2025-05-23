import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api"
const SELF_PLAN_URL = `${API_BASE_URL}/student/self-study-plans`
const STUDY_PLAN_URL = `${API_BASE_URL}/student/study-plans`
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
  axios.get(`${SELF_PLAN_URL}/semester/${semester}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const createSelfStudyPlan = (data, token) =>
  axios.post(SELF_PLAN_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const updateSelfStudyPlan = (planID, data, token) =>
  axios.put(`${SELF_PLAN_URL}/${planID}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const deleteSelfStudyPlan = (planID, token) =>
  axios.delete(`${SELF_PLAN_URL}/${planID}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
export const fetchStudyPlans = (semester, week, token) =>
  axios.get(`${STUDY_PLAN_URL}/semester/${semester}/week/${week}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const createStudyPlan = (data, token) =>
  axios.post(STUDY_PLAN_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const updateStudyPlan = (id, data, token) =>
  axios.put(`${STUDY_PLAN_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
export const deleteStudyPlan = (id, token) =>
  axios.delete(`${STUDY_PLAN_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })