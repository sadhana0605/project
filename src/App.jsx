import { useState, useEffect } from 'react'
import StudentForm from './components/StudentForm.jsx'
import StudentList from './components/StudentList.jsx'
import './App.css'

// Sample students shown the very first time the app opens.
const sampleStudents = [
  { id: 'sample-1', name: 'Aarav Sharma', email: 'aarav@example.com', course: 'React' },
  { id: 'sample-2', name: 'Priya Patel', email: 'priya@example.com', course: 'JavaScript' },
]

// What an empty form looks like. We reuse this to clear the form after saving.
const emptyForm = { name: '', email: '', course: 'React' }

// Read the saved students from the browser (localStorage).
// If nothing is saved yet, start with the sample students.
function loadStudents() {
  try {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : sampleStudents
  } catch {
    return sampleStudents
  }
}

function App() {
  // ---------- STATE ----------
  // students : the list of all students (this is our "database")
  // formData : what is currently typed in the form
  // editId   : id of the student being edited (null = we are adding a new one)
  // error    : a message to show when the form is not filled in correctly
  const [students, setStudents] = useState(loadStudents)
  const [formData, setFormData] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  // Save the list in the browser every time it changes,
  // so the data is still there after a page refresh.
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  // Runs every time the user types in an input or picks a course.
  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Runs when the form is submitted. It does CREATE or UPDATE.
  function handleSubmit(event) {
    event.preventDefault() // stop the page from reloading

    const name = formData.name.trim()
    const email = formData.email.trim()

    if (name === '' || email === '') {
      setError('Please enter both a name and an email.')
      return
    }

    if (editId === null) {
      // ---------- CREATE ----------
      // Make a new student and add it to the end of the list.
      // crypto.randomUUID() gives every student a unique id.
      const newStudent = {
        id: crypto.randomUUID(),
        name,
        email,
        course: formData.course,
      }
      setStudents([...students, newStudent])
    } else {
      // ---------- UPDATE ----------
      // Go through the list and replace only the student we are editing.
      const updatedList = students.map((student) =>
        student.id === editId
          ? { ...student, name, email, course: formData.course }
          : student,
      )
      setStudents(updatedList)
    }

    resetForm()
  }

  // Runs when "Edit" is clicked: put that student's details into the form.
  function handleEdit(student) {
    setEditId(student.id)
    setFormData({ name: student.name, email: student.email, course: student.course })
    setError('')
  }

  // ---------- DELETE ----------
  // Keep every student except the one with this id.
  function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this student?')
    if (!confirmed) return

    setStudents(students.filter((student) => student.id !== id))

    // If we deleted the student we were editing, clear the form too.
    if (id === editId) resetForm()
  }

  // Clear the form and go back to "add" mode.
  function resetForm() {
    setFormData(emptyForm)
    setEditId(null)
    setError('')
  }

  // ---------- READ ----------
  // StudentList receives the students and shows them on the page.
  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Manager</h1>
        <p>A beginner React project: Create, Read, Update and Delete students.</p>
      </header>

      <StudentForm
        formData={formData}
        isEditing={editId !== null}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <StudentList
        students={students}
        editId={editId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App