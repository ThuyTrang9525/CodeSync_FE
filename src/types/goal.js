export const GoalStatus = {
  Completed: "completed",
  InProgress: "in-progress",
  NotStarted: "not-started",
};
export class Goal  {
  constructor(id, title, subject, semester, deadline, status, priority, details, category) {
    this.id = id;
    this.title = title;
    this.subject = subject;
    this.semester = semester;
    this.deadline = deadline;
    this.status = status;
    this.priority = priority;
    this.details = details;
    this.category = category;
  }
}
export const GoalListProps = {
  goals: [], // Mảng các mục tiêu
  updateGoalStatus: function (id, status) {}, // Hàm cập nhật trạng thái
  deleteGoal: function (id) {}, // Hàm xóa mục tiêu
  editGoal: function (goal) {}, // Hàm chỉnh sửa mục tiêu
};