import { useEffect, useState } from "react";
import axios from "axios";
import { fetchGoals } from "../../service/api"

export default function GoalStats() {
  const [stats, setStats] = useState({
    totalGoals: 0,
    completedGoals: 0,
    inProgressGoals: 0,
    notStartedGoals: 0,
    completionRate: 0,
  });

 useEffect(() => {
    const getGoals = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetchGoals(token)
        const goals = res.data.data

        const totalGoals = goals.length
        const completedGoals = goals.filter((goal) => goal.status === "completed").length
        const inProgressGoals = goals.filter((goal) => goal.status === "in-progress").length
        const notStartedGoals = goals.filter((goal) => goal.status === "not-started").length
        const completionRate = totalGoals
          ? ((completedGoals / totalGoals) * 100).toFixed(2)
          : 0

        setStats({
          totalGoals,
          completedGoals,
          inProgressGoals,
          notStartedGoals,
          completionRate,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    getGoals()
  }, []);

  const { totalGoals, completedGoals, inProgressGoals, notStartedGoals, completionRate } = stats;

  
  return (
    <div className="row text-center">
      <div className="col">
        <div className="card h-100 stats-card">
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-primary-light rounded-circle p-3 me-3">
                <i className="bi bi-list text-primary fs-4"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Goals</h6>
                <h3 className="mb-0">{totalGoals}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 stats-card">
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-success-light rounded-circle p-3 me-3">
                <i className="bi bi-check-circle text-success fs-4"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">Completed</h6>
                <h3 className="mb-0">{completedGoals}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 stats-card">
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-warning-light rounded-circle p-3 me-3">
                <i className="bi bi-hourglass-split text-warning fs-4"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">In Progress</h6>
                <h3 className="mb-0">{inProgressGoals}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 stats-card">
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-secondary-light rounded-circle p-3 me-3">
                <i className="bi bi-slash-circle text-secondary fs-4"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">Not Started</h6>
                <h3 className="mb-0">{notStartedGoals}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 stats-card">
          <div className="card-body p-3">
            <div className="d-flex flex-column align-items-center">
              <h6 className="text-muted mb-1">Completion Rate</h6>
              <h3 className="mb-0">{completionRate}%</h3>
              <div className="progress w-100 mt-2" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${completionRate}%` }}
                  aria-valuenow={completionRate}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
