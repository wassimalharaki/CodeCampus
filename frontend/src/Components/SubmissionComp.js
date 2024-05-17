import './SubmissionComp.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function SubmissionComp({s}) {
    const navigate = useNavigate();

    function handleView() {
        navigate("/editor", {state: {
            fill: s.source
        }});
    }

    return (
        <tr>
            <td>{s.user_email}</td>
            <td>{s.problem_name}</td>
            <td className = "s-result" style={{color: (s.passed == s.total ? 'green' : 'red')}}>{s.passed + " / " + s.total}</td>
            <td className = "s-btn-cont">   
                <Button onClick={() => handleView()}>View</Button>
            </td>
        </tr>
    )
}