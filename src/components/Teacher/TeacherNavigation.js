export default function Navigation({ activeTab = "class" }) {
    return (
      <nav className="text-white" style={{ backgroundColor: "#009688" }}>
        <div className="container d-flex justify-content-between">
          <NavItem href="/teacher-home" icon="bi-people-fill" label="Class" active={activeTab === "class"} />
          <NavItem href="/timetable" icon="bi-calendar-week" label="Timetable" active={activeTab === "timetable"} />
          <NavItem href="/teacher-studentList" icon="bi-person-fill" label="Students" active={activeTab === "students"} />
          <NavItem
            href="/teacher-notification"
            icon="bi-bell-fill"
            label="Notification"
            active={activeTab === "notifications"}
          />
          <NavItem href="/settings" icon="bi-gear-fill" label="Setting" active={activeTab === "settings"} />
          <NavItem href="/support" icon="bi-life-preserver" label="Support" active={activeTab === "support"} />
        </div>
      </nav>
    )
  }
  
  function NavItem({ icon, label, active = false, href }) {
    return (
      <a
        href={href}
        className={`d-flex flex-column align-items-center justify-content-center py-2 px-3 text-white text-decoration-none flex-grow-1 ${
          active ? "bg-opacity-75" : ""
        }`}
        style={{ backgroundColor: active ? "#00796B" : "transparent" }}
      >
        <i className={`bi ${icon} nav-icon`}></i>
        <div className="nav-label">{label}</div>
      </a>
    )
  }
  