import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === 'Name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else if (name === 'phone') {
            setPhone(value);
        }
    };

    const pushData = () => {
        if(Name === '' || email === '' || password === '' || confirmPassword === '' || phone === '') {
            alert('Please fill all the fields');
            return;
        }
        else if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        else if(phone.length !== 10){
            alert('Please enter a valid phone number');
            return;
        }
        else if(email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            alert('Please enter a valid email address');
            return;
        }
        else {
            const data = { Name, email, password, confirmPassword, phone };
            axios
                .post('http://localhost:3000/register', data)
                .then((response) => {
                    if (response.data.success === false) {
                        alert(response.data.message);
                    } else {
                        navigate('/login');
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
            });
        }
        
    };

    return (
        <>
            <div className="register">
                <h1>Register</h1>
                <input type="text" name="Name" placeholder="Name" onChange={handleInput} autoComplete="off" required />
                <input type="email" name="email" placeholder="Email" onChange={handleInput} autoComplete="off" required />
                <input type="password" name="password" placeholder="Password" onChange={handleInput} autoComplete="off" required />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleInput}
                    autoComplete="off"
                    required
                />
                <input type="text" name="phone" placeholder="Phone" onChange={handleInput} autoComplete="off" required />
                <button onClick={pushData}>Register</button>
            </div>
        </>
    );
};

export default Register;
