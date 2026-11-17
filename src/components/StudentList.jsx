
function StudentList({ students, editId, onEdit, onDelete }) {
  return (
    <section className="card">
      <h2>Students ({students.length})</h2>

      {students.length === 0 ? (
        <p className="empty-message">No students yet. Add your first one above.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* map() turns every student in the list into one table row */}
              {students.map((student, index) => (
                <tr key={student.id} className={student.id === editId ? 'editing' : ''}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <div className="row-buttons">
                      <button className="btn btn-small" onClick={() => onEdit(student)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => onDelete(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default StudentList