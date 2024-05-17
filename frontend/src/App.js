import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { currentUser } from './Store/UserSlice';
import Login from "./Pages/Login.js"
import Editor from "./Pages/Editor.js"
import Problemset from "./Pages/Problemset.js"
import CreateProblem from "./Pages/CreateProblem.js"
import Problem from "./Pages/Problem.js";
import MyProblems from "./Pages/MyProblems.js";
import UpdateProblem from "./Pages/UpdateProblem.js";
import Users from "./Pages/Users.js";
import AddUser from "./Pages/AddUser.js";
import MySubmissions from "./Pages/MySubmissions.js";
import Examset from "./Pages/Examset.js";
import CreateExam from "./Pages/CreateExam.js";
import UpdateExam from "./Pages/UpdateExam.js";
import Exam from "./Pages/Exam.js";
import Results from "./Pages/Results.js";
import ExamStudentSubmissions from "./Pages/ExamStudentSubmissions.js";


export default function App() {
    const user = useSelector(currentUser);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/examstdsubs" element={user.loggedIn && user.user.role != "Student" ? <ExamStudentSubmissions/> : <Login/>}/>
                <Route path="/examresults/:id" element={user.loggedIn && user.user.role != "Student" ? <Results/> : <Login/>}/>
                <Route path="/exam/:id" element={user.loggedIn ? <Exam/> : <Login/>}/>
                <Route path="/updateexam/:id" element={user.loggedIn && (user.user.role == "Admin" || user.user.role == "Instructor") ? <UpdateExam/> : <Login/>}/>
                <Route path="/createexam" element={user.loggedIn && (user.user.role == "Admin" || user.user.role == "Instructor") ? <CreateExam/> : <Login/>}/>
                <Route path="/examset" element={user.loggedIn ? <Examset/> : <Login/>}/>
                <Route path="/mysubmissions" element={user.loggedIn ? <MySubmissions email = {user.user.email}/> : <Login/>}/>
                <Route path="/adduser" element={user.loggedIn && user.user.role == "Admin" ? <AddUser/> : <Login/>}/>
                <Route path="/users" element={user.loggedIn && user.user.role == "Admin" ? <Users/> : <Login/>}/>
                <Route path="/editor" element={user.loggedIn ? <Editor/> : <Login/>}/>
                <Route path="/problemset" element={user.loggedIn ? <Problemset/> : <Login/>}/>
                <Route path="/myprobs" element={user.loggedIn ? <MyProblems/> : <Login/>}/>
                <Route path="/updateprob/:id" element={user.loggedIn ? <UpdateProblem/> : <Login/>}/>
                <Route path="/createprob" element={user.loggedIn && user.user.role != "Student" ?  <CreateProblem/> : <Login/>}/>
                <Route path="/problem/:id" element={user.loggedIn ? <Problem/> : <Login/>}/>
            </Routes>
        </Router>
    );
}