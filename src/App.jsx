import { useState, useEffect } from 'react'
import StudentForm from './components/StudentForm.jsx'
import StudentList from './components/StudentList.jsx'
import './App.css'

const sampleStudents = [
  { id: 'sample-1', name: 'Aarav Sharma', email: 'aarav@example.com', course: 'React' },
  { id: 'sample-2', name: 'Priya Patel', email: 'priya@example.com', course: 'JavaScript' },
]

const emptyForm = { name: '', email: '', course: 'React' }

function loadStudents() {
  try {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : sampleStudents
  } catch {
    return sampleStudents
  }
}

function App() {
  
  const [students, setStudents] = useState(loadStudents)
  const [formData, setFormData] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')


  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault() 

    const name = formData.name.trim()
    const email = formData.email.trim()

    if (name === '' || email === '') {
      setError('Please enter both a name and an email.')
      return
    }

    if (editId === null) {
      
      const newStudent = {
        id: crypto.randomUUID(),
        name,
        email,
        course: formData.course,
      }
      setStudents([...students, newStudent])
    } else {
      
      const updatedList = students.map((student) =>
        student.id === editId
          ? { ...student, name, email, course: formData.course }
          : student,
      )
      setStudents(updatedList)
    }

    resetForm()
  }

  function handleEdit(student) {
    setEditId(student.id)
    setFormData({ name: student.name, email: student.email, course: student.course })
    setError('')
  }

 function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this student?')
    if (!confirmed) return

    setStudents(students.filter((student) => student.id !== id))

    if (id === editId) resetForm()
  }

  function resetForm() {
    setFormData(emptyForm)
    setEditId(null)
    setError('')
  }

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