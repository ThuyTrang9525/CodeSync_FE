import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api"
const SELF_PLAN_URL = `${API_BASE_URL}/student/self-study-plans`
const STUDY_PLAN_URL = `${API_BASE_URL}/student/study-plans`

const token = localStorage.getItem("token")

// Goals APIs
export const createGoal = async (formData, token) =>
  axios.post(`${API_BASE_URL}/goals`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  })

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
  axios.delete(`${API_BASE_URL}/goals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const editGoal = (updatedGoal, token) =>
  axios.put(`${API_BASE_URL}/goals/${updatedGoal.goalID || updatedGoal.id}`, updatedGoal, {
    headers: { Authorization: `Bearer ${token}` },
  })

// Study Plan APIs
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

export const fetchStudyPlans = (semester, week, token) =>
  axios.get(`${STUDY_PLAN_URL}/semester/${semester}/week/${week}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

// Self-Study (in-class) Plan APIs
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

// Other APIs
export const getMyClasses = () =>
  axios.get(`${API_BASE_URL}/my-classes`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const updateUserProfile = (userID, updatedProfile) =>
  axios.put(`${API_BASE_URL}/student/profile/${userID}`, updatedProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

export const getUserProfile = () =>
  axios.get(`${API_BASE_URL}/student/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

export const getUserNotifications = (receiverID) =>
  axios.get(`${API_BASE_URL}/student/notifications/${receiverID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

export const addUser = (userData) =>
  axios.post(`${API_BASE_URL}/admin/users`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  export const getAllNotifications = () =>
  axios.get(`${API_BASE_URL}/admin/notifications`);

export const markNotificationAsRead = (id) =>
  axios.post(`${API_BASE_URL}/admin/notifications/${id}/read`);


export const fetchClasses = () =>
  axios.get(`${API_BASE_URL}/admin/classes`);

export const updateClass = (classID, data) =>
  axios.put(`${API_BASE_URL}/admin/classes/${classID}`, data);

export const deleteClass = (classID) =>
  axios.delete(`${API_BASE_URL}/admin/classes/${classID}`);

export const fetchStudents = () =>
  axios.get(`${API_BASE_URL}/admin/reports`);

export const fetchGoalsByStudent = (userID) =>
  axios.get(`${API_BASE_URL}/admin/getGoalsbyStudent/${userID}`);

export const fetchUsers = () =>
  axios.get(`${API_BASE_URL}/admin/users`);

export const updateUser = (userID, data) =>
  axios.put(`${API_BASE_URL}/admin/users/${userID}`, data);

export const deleteUser = (userID) =>
  axios.delete(`${API_BASE_URL}/admin/users/${userID}`);

export const fetchAdminGoals = () =>
  axios.get(`${API_BASE_URL}/admin/goals`);