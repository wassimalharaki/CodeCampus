import './ProbComp.css';
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function ProbComp({p, inExam}) {
    const user = useSelector(currentUser);
    const navigate = useNavigate();
    function handleView() {
        navigate("/problem/" + p.id);
    }
    function handleUpdate() {
        navigate("/updateprob/" + p.id);
    }
    function handleDelete() {
        axios.delete('http://localhost:3001/api/problem/' + p._id);
    }

    if (!p.visible && !inExam) {
        if (p.user_id == user.user._id || user.user.role == "Admin")
            return (
                <tr>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.tags}</td>
                    <td className = "btn-cont">
                        <Button onClick={() => handleView()}>View</Button>
                        {(user.user._id == p.user_id || user.user.role == "Admin") && <Button onClick={() => handleUpdate()}>Update</Button>}
                        {(user.user._id == p.user_id || user.user.role == "Admin") && <Button href = "/problemset" className='btn-danger' onClick={() => handleDelete()}>Delete</Button>}
                    </td>
                </tr>
            );
        else
            return;
    }
    else
        return (
            <tr>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.tags}</td>
                <td className = "btn-cont">
                    <Button onClick={() => handleView()}>View</Button>
                    {(user.user._id == p.user_id || user.user.role == "Admin") && <Button onClick={() => handleUpdate()}>Update</Button>}
                    {(user.user._id == p.user_id || user.user.role == "Admin") && <Button href = "/problemset" className='btn-danger' onClick={() => handleDelete()}>Delete</Button>}
                </td>
            </tr>
        )
}