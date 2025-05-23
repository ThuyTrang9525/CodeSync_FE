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
/// Teacher
export const TeacherClasses = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/teacher/classes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.classes) {
      return data.classes;
    } else {
      console.error("No classes field in response", data);
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch classes:", err);
    return [];
  }
};

export const StudentById = async (studentId) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/teacher/students/${studentId}`);
    return res.data;
  } catch (err) {
    console.error("Error loading student data", err);
    throw err; 
  }
};

export const StudentsByClassId = async (classId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/classes/${classId}/students`);

    if (!response.ok) throw new Error("Failed to fetch students");

    const data = await response.json();

    if (Array.isArray(data.students)) {
      return data.students;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Unexpected data format from API", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const NotificationsByReceiver = async (receiverID) => {
  try {
    const response = await fetch(`http://localhost:8000/api/notifications/${receiverID}`);
    const data = await response.json();

    if (data.status === "success") {
      return data.data; // danh sách thông báo
    } else {
      throw new Error(data.message || "Failed to load notifications.");
    }
  } catch (err) {
    console.error("Error fetching notifications:", err);
    throw err;
  }
};