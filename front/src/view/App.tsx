import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import { asyncGet, asyncDelete, asyncPost, asyncPut } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'

function App() {
  const [students, setStudents] = useState<Array<Student>>([])
  const [id, setid] = useState("")
  const [account, setaccount] = useState("")
  const [name, setname] = useState("")
  const [department, setdepartment] = useState("")
  const [grade, setgrade] = useState("")
  const [Class, setclass] = useState("")
  const [Email, setemail] = useState("")
  const [findid, setfindid] = useState("")
  const [newName, setnewName] = useState("")
  
  const [searchId, setSearchId] = useState("")
  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null)

  const apiEndpoint = `${api.delete}?id=${id}`
  
  async function handle() {
    try {
      const response = await asyncDelete(apiEndpoint)
      if (response.code == 200) {
        alert("刪除成功")
        fetchStudents()
      } else if (response.code == 404) {
        alert("找不到使用者")
      } else {
        alert("伺服器錯誤")
      }
    }
    catch (error) {
      alert(error)
    }
  }

  async function insert() {
    try {
      const response = await asyncPost(api.insertOne, {
        "userName": account,
        "name": name,
        "department": department,
        "grade": grade,
        "class": Class,
        "email": Email
      })
      if (response.code == 200) {
        alert("新增成功")
        fetchStudents()
      } else if (response.code == 403) {
        alert("重複的使用者帳號")
      } else {
        alert("伺服器錯誤")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async function update() {
    const apiEndpoint = `${api.update}?id=${findid}&name=${newName}`
    try {
      const response = await asyncPut(apiEndpoint)
      if (response.code == 200) {
        alert("更新成功")
        fetchStudents()
      } else if (response.code == 404) {
        alert("找不到使用者")
      } else {
        alert("伺服器錯誤")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async function searchStudent() {
    try {
      const response = await asyncGet(`${api.findAll}?id=${searchId}`)
      if (response.code == 200 && response.body.length > 0) {
        setSearchedStudent(response.body[0])
      } else {
        alert("找不到該學生")
        setSearchedStudent(null)
      }
    }
    catch (error) {
      console.log(error)
      alert("查詢出錯")
    }
  }

  const cache = useRef<boolean>(false)

  const fetchStudents = () => {
    asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
      if (res.code == 200) {
        setStudents(res.body)
      }
    });
  }

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      fetchStudents()
    }
  }, [])

  const studentList = students ? students.map((student: Student) => {
    return (
      <div className='student dark-card' key={student._id}>
        <p>id: {student._id}</p>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>Email: {student.email}</p>
        <p>缺席次數: {student.absences ? student.absences : 0}</p>
      </div>
    )
  }) : "loading"

  return (
    <div className="dark-theme">
      <div className='block'>
        <h1 className="dark-title">Student List</h1>
        <div className="container">
          {studentList}
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <label className="dark-label">Search Student by ID</label>
          <input 
            type="text" 
            className="dark-input"
            value={searchId} 
            onChange={(e) => setSearchId(e.target.value)} 
            placeholder="Enter student ID to search"
          />
          <button className="dark-button" onClick={searchStudent}>Search</button>
        </div>
      </div>

      {searchedStudent && (
        <div className='block'>
          <h2 className="dark-title">Search Result</h2>
          <div className="container">
            <div className='student dark-card'>
              <p>id: {searchedStudent._id}</p>
              <p>帳號: {searchedStudent.userName}</p>
              <p>座號: {searchedStudent.sid}</p>
              <p>姓名: {searchedStudent.name}</p>
              <p>院系: {searchedStudent.department}</p>
              <p>年級: {searchedStudent.grade}</p>
              <p>班級: {searchedStudent.class}</p>
              <p>Email: {searchedStudent.email}</p>
              <p>缺席次數: {searchedStudent.absences ? searchedStudent.absences : 0}</p>
            </div>
          </div>
        </div>
      )}

      <div className="input-section">
        <div className="input-wrapper">
          <label className="dark-label">Delete by ID</label>
          <input 
            type="text" 
            className="dark-input"
            value={id} 
            onChange={(e) => setid(e.target.value)} 
            placeholder="Enter ID to delete"
          />
          <button className="dark-button delete-button" onClick={handle}>Delete</button>
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <label className="dark-label">Account</label>
          <input 
            type="text" 
            className="dark-input"
            value={account} 
            onChange={(e) => setaccount(e.target.value)} 
            placeholder="Enter account"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Name</label>
          <input 
            type="text" 
            className="dark-input"
            value={name} 
            onChange={(e) => setname(e.target.value)} 
            placeholder="Enter name"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Department</label>
          <input 
            type="text" 
            className="dark-input"
            value={department} 
            onChange={(e) => setdepartment(e.target.value)} 
            placeholder="Enter department"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Grade</label>
          <input 
            type="text" 
            className="dark-input"
            value={grade} 
            onChange={(e) => setgrade(e.target.value)} 
            placeholder="Enter grade"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Class</label>
          <input 
            type="text" 
            className="dark-input"
            value={Class} 
            onChange={(e) => setclass(e.target.value)} 
            placeholder="Enter class"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Email</label>
          <input 
            type="text" 
            className="dark-input"
            value={Email} 
            onChange={(e) => setemail(e.target.value)} 
            placeholder="Enter email"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Insert Student</label>
          <button className="dark-button insert-button" onClick={insert}>Insert</button>
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <label className="dark-label">Find ID</label>
          <input 
            type="text" 
            className="dark-input"
            value={findid} 
            onChange={(e) => setfindid(e.target.value)} 
            placeholder="Enter ID to update"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">New Name</label>
          <input 
            type="text" 
            className="dark-input"
            value={newName} 
            onChange={(e) => setnewName(e.target.value)} 
            placeholder="Enter new name"
          />
        </div>
        <div className="input-wrapper">
          <label className="dark-label">Update Student</label>
          <button className="dark-button update-button" onClick={update}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default App;