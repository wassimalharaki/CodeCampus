import './UserComp.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useState } from 'react';

export default function UserComp({u}) {

    function handleUpdate() {
        withReactContent(Swal).fire({
            icon: "warning",
            title: <i>Enter new password</i>,
            input: 'text',
            preConfirm: () => {
                console.log(Swal.getInput().value);
                const password = Swal.getInput().value.trim();
                if (password.length == 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Invalid input",
                        text: "Empty password"
                    });
                    return;
                }
                axios.put('http://localhost:3001/api/user/' + u._id, {
                    password
                });
            },
        })
    }
    
    function handleDelete() {
        axios.delete('http://localhost:3001/api/user/' + u._id);
    }

    return (
        <tr>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td className = "btn-cont">
                <Button onClick={() => handleUpdate()}>Update</Button>
                <Button href = "/users" className='btn-danger' onClick={() => handleDelete()}>Delete</Button>
            </td>
        </tr>
    )
}