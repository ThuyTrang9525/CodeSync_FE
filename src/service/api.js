import axios from "axios";

const API_BASE_URL = "https://codesyncbe-production.up.railway.app/api"
const SELF_PLAN_URL = `${API_BASE_URL}/student/self-study-plans`
const STUDY_PLAN_URL = `${API_BASE_URL}/student/study-plans`

const token = localStorage.getItem("token");
const EVENT_URL = `${API_BASE_URL}/events`
const DASHBOARD_URL = `${API_BASE_URL}/stats`;
export const login = (email, password, role) =>
  axios.post(`${API_BASE_URL}/login`, { email, password, role }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });

// Goals APIs
export const createGoal = async (formData, token) =>
  axios.post(`${API_BASE_URL}/goals`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const fetchGoals = (token, semester = null, week = null) => {
  let url = `${API_BASE_URL}/goals`;

  if (semester && week) {
    url = `${API_BASE_URL}/goals/semesters/${semester}?week=${week}`;
  }

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateGoalStatus = (goalID, data, token) =>
  axios.put(`${API_BASE_URL}/goals/${goalID}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const deleteGoal = (id, token) =>
  axios.delete(`${API_BASE_URL}/goals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const editGoal = (goal, token) =>
  axios.put(`${API_BASE_URL}/goals/${goal.goalID}`, goal, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

// Study Plan APIs
export const createStudyPlan = (data, token) =>
  axios.post(STUDY_PLAN_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const updateStudyPlan = (id, data, token) =>
  axios.put(`${STUDY_PLAN_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteStudyPlan = (id, token) =>
  axios.delete(`${STUDY_PLAN_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchStudyPlans = (semester, week, token) =>
  axios.get(`${STUDY_PLAN_URL}/semester/${semester}/week/${week}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Self-Study (in-class) Plan APIs
export const getSelfStudyPlans = (semester, token) =>
  axios.get(`${SELF_PLAN_URL}/semester/${semester}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createSelfStudyPlan = (data, token) =>
  axios.post(SELF_PLAN_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateSelfStudyPlan = (planID, data, token) =>
  axios.put(`${SELF_PLAN_URL}/${planID}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteSelfStudyPlan = (planID, token) =>
  axios.delete(`${SELF_PLAN_URL}/${planID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Student Support Request API
export const sendSupportRequest = (data) =>
  axios.post(`${API_BASE_URL}/support-requests`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

// Other APIs
export const getMyClasses = () =>
  axios.get(`${API_BASE_URL}/my-classes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserProfile = (userID, updatedProfile) =>
  axios.put(`${API_BASE_URL}/student/profile/${userID}`, updatedProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getUserProfile = () =>
  axios.get(`${API_BASE_URL}/student/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getCertificate = (userID) =>
  axios.get(`${API_BASE_URL}/student/certificates/${userID}`, { 
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
  });

// Teacher
export const TeacherClasses = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/teacher/classes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = res.data;

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
    const res = await axios.get(`${API_BASE_URL}/teacher/students/${studentId}`);
    return res.data;
  } catch (err) {
    console.error("Error loading student data", err);
    throw err;
  }
};

export const StudentsByClassId = async (classId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/classes/${classId}/students`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = res.data;

    if (Array.isArray(data.students)) {
      return data.students;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Unexpected data format from API", data);
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch students by class ID:", err);
    return [];
  }
};

export const NotificationsByReceiver = async (receiverID) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/notifications/${receiverID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = res.data;

    if (data.status === "success") {
      return data.data; 
    } else {
      console.error("API returned error status:", data);
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    return [];
  }
};

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

export const createClass = (data) =>
  axios.post(`${API_BASE_URL}/admin/classes`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchStudents = () =>
  axios.get(`${API_BASE_URL}/admin/reports`);

export const fetchTeachers = () => axios.get(`${API_BASE_URL}/admin/teachers`);

export const assignTeacherToClass = (data) =>
  axios.post(`${API_BASE_URL}/admin/assign-teacher`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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

export const getTimeTable = () =>
  axios.get(`${API_BASE_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

export const fetchComments = (planID, planType, token) =>
  axios.get(`${API_BASE_URL}/comments`, {
    params: { planID, planType },
    headers: { Authorization: `Bearer ${token}` },
  });

export const addComment = (data, token) =>
  axios.post(`${API_BASE_URL}/comments`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const resolveComment = (commentID, token) =>
  axios.put(`${API_BASE_URL}/comments/${commentID}/resolve`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllSubject = () =>
  axios.get(`${API_BASE_URL}/teacher/subjects`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const fetchEvent = async () => {
  const res = await axios.get(EVENT_URL, { headers: getAuthHeader() });
  return res.data;
};

export const createEvent = async (eventData) => {
  const res = await axios.post(EVENT_URL, eventData, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const updateEvent = async (id, eventData) => {
  const res = await axios.put(`${EVENT_URL}/${id}`, eventData, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${EVENT_URL}/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const fetchDashboardStats = async () => {
  const res = await axios.get(DASHBOARD_URL);
  return res.data;
};