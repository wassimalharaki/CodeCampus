import { useSelector, useDispatch } from 'react-redux';
import { currentUser, logout } from '../Store/UserSlice';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Header() {
    const user = useSelector(currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }
    
    function fillRight() {
        if (!user.loggedIn)
            return "";
        else {
            return (
                <>
                    {user.user.role === "Admin" && <Button href="/users" className = "home-btn">Users</Button>}
                    <Button href="/mysubmissions" className = "home-btn">My Submissions</Button>
                    <Button href="/problemset" className = "home-btn">Problemset</Button>
                    <Button href="/examset" className = "home-btn">Exams</Button>
                    <Button href="/editor" className = "home-btn">Editor</Button>
                    <Button className = "home-btn" onClick={() => handleLogout()}>Logout</Button>
                </>
            );
        }
    }
    
    return (
        <div className = "header-parent">
            <div className = "left">
                <img src = "/logo192.png" alt = "image" className = "logo-image"/>
                <p className = "header-title">Code Campus</p>
            </div>
            <div className = "right">
                {fillRight()}
            </div>
        </div>
    )
}