// Shows all the students in a table (the READ part of CRUD).
// Each row has an Edit button and a Delete button.

// The form used to ADD a new student or EDIT an existing one.
// It does not keep any data itself. Everything comes from App.jsx as "props".

const courses = ['React', 'JavaScript', 'Python', 'Java']

function StudentForm({ formData, isEditing, error, onChange, onSubmit, onCancel }) {
  return (
    <section className="card">
      <h2>{isEditing ? 'Edit student' : 'Add a student'}</h2>

      <form className="student-form" onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="e.g. Rahul Verma"
            value={formData.name}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Course
          <select name="course" value={formData.course} onChange={onChange}>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </label>

        {/* Show the error message only when there is one */}
        {error && <p className="form-error">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update student' : 'Add student'}
          </button>

          {/* The Cancel button appears only while editing */}
          {isEditing && (
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default StudentForm