import './ExamComp.css';
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function ExamComp({e}) {
    const start = new Date(e.start_time);
    const end = new Date(e.end_time);
    const user = useSelector(currentUser);
    const navigate = useNavigate();

    function handleEnter() {
        navigate("/exam/" + e._id);
    }

    function handleResults() {
        navigate("/examresults/" + e._id);
    }

    function handleUpdate() {
        navigate("/updateexam/" + e._id);
    }

    function handleDelete() {
        axios.delete('http://localhost:3001/api/exam/' + e._id);
    }

    return (
        <tr>
            <td>{e.name}</td>
            <td>{start.toLocaleString()}</td>
            <td>{end.toLocaleString()}</td>
            <td className = "exc-btn-cont">
                <Button onClick={() => handleEnter()}>Enter</Button>
                {(user.user._id == e.user_id || user.user.role == "Admin") && <Button onClick={() => handleResults()}>Results</Button>}
                {(user.user._id == e.user_id || user.user.role == "Admin") && <Button onClick={() => handleUpdate()}>Update</Button>}
                {(user.user._id == e.user_id || user.user.role == "Admin") && <Button href = "/examset" className='btn-danger' onClick={() => handleDelete()}>Delete</Button>}
            </td>
        </tr>
    )
}