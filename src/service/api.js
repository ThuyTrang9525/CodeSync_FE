import axios from "axios"

const API_BASE_URL = "https://codesyncbe-production.up.railway.app/api"
const SELF_PLAN_URL = `${API_BASE_URL}/student/self-study-plans`
const STUDY_PLAN_URL = `${API_BASE_URL}/student/study-plans`

const token = localStorage.getItem("token")
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
  })

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
  })

export const deleteGoal = (id, token) =>
  axios.delete(`${API_BASE_URL}/goals/${id}`, {
    
   headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

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
export const getWeekGoalProgress = async (email, week) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/week-goals-progress`, {
      params: { email, week }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weekly goal progress:", error);
    return { progress: 0 }; // fallback nếu lỗi
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
export const handleSetDeadline = async (goalID, newDeadline, classID = null,currentUserId) => {
  try {
    await axios.put(
      `${API_BASE_URL}/teacher/goals/${goalID}/set-deadline`,
      { deadline: newDeadline, classID, senderID: currentUserId }
    );
  } catch (error) {
    console.error("Failed to update deadline", error);
  }
};
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

