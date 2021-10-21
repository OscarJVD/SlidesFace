import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    return (
        <div>
            Login
        </div>
    );
}

export default Login;