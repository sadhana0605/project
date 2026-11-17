
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

        {}
        {error && <p className="form-error">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update student' : 'Add student'}
          </button>

          {}
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