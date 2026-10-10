import { useState } from "react";
import "./App.css";

const initialStudents = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    course: "Computer Science",
    year: "Year 1",
  },
  {
    id: 2,
    name: "Sara Alemu",
    email: "sara@example.com",
    course: "Software Engineering",
    year: "Year 2",
  },
  {
    id: 3,
    name: "Dawit Tesfaye",
    email: "dawit@example.com",
    course: "Information Technology",
    year: "Year 3",
  },
];

const courses = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Data Science",
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(courses[0]);
  const [year, setYear] = useState("Year 1");
  const [showForm, setShowForm] = useState(false);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || student.course === filter;

    return matchesSearch && matchesFilter;
  });

  function addStudent(event) {
    event.preventDefault();

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      course,
      year,
    };

    setStudents([...students, newStudent]);
    setName("");
    setEmail("");
    setCourse(courses[0]);
    setYear("Year 1");
    setShowForm(false);
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="brand">
          Campus<span>Flow</span>
        </h2>

        <p className="side-label">MAIN MENU</p>
        <div className="nav-item active">▦ &nbsp; Dashboard</div>
        <div className="nav-item">♙ &nbsp; Students</div>
        <div className="nav-item">▤ &nbsp; Courses</div>
        <div className="nav-item">⚙ &nbsp; Settings</div>

        <div className="sidebar-bottom">
          Student Management System
          <br />
          <small>React practical project</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Student Dashboard</h1>
            <p className="subtitle">
              Manage your students and courses in one place.
            </p>
          </div>

          <div className="profile">
            <span className="avatar">A</span>
            <div>
              <strong>Administrator</strong>
              <small>Admin account</small>
            </div>
          </div>
        </header>

        <section className="stats">
          <article className="stat-card">
            <div className="stat-icon purple">♙</div>
            <p>Total Students</p>
            <h2>{students.length}</h2>
            <small>Registered students</small>
          </article>

          <article className="stat-card">
            <div className="stat-icon blue">▤</div>
            <p>Total Courses</p>
            <h2>{courses.length}</h2>
            <small>Available programs</small>
          </article>

          <article className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Study Years</p>
            <h2>4</h2>
            <small>Year 1 through Year 4</small>
          </article>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Students</h2>
              <p>View, search, add, and remove students.</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "+ Add Student"}
            </button>
          </div>

          {showForm && (
            <form className="student-form" onSubmit={addStudent}>
              <label>
                Full Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter student name"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="student@example.com"
                  required
                />
              </label>

              <label>
                Course
                <select
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                >
                  {courses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Study Year
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                >
                  {["Year 1", "Year 2", "Year 3", "Year 4"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <button className="primary-button" type="submit">
                Save Student
              </button>
            </form>
          )}

          <div className="toolbar">
            <input
              className="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
            />

            <select
              className="filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="All">All Courses</option>
              {courses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>COURSE</th>
                  <th>YEAR</th>
                  <th>EMAIL</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-name">
                        <span className="student-avatar">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                        <strong>{student.name}</strong>
                      </div>
                    </td>

                    <td>{student.course}</td>

                    <td>
                      <span className="year-badge">{student.year}</span>
                    </td>

                    <td>{student.email}</td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty">
                      No students found. Try another search or add a student.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="table-footer">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </section>

        <footer>CampusFlow · Student Management System · React</footer>
      </main>
    </div>
  );
}

export default App;
