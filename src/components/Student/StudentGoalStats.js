export default function GoalStats({
  totalGoals,
  completedGoals,
  inProgressGoals,
  notStartedGoals,
  completionRate,
}) {
  return (
    <div className="row text-center">
      <div className="col">
        <div className="card h-100 stats-card">
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-primary-light rounded-circle p-3 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0z"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-success"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-warning"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-secondary"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
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
  )
}