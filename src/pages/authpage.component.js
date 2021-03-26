import React, { useState } from "react";
import '../App.css';
import LoginForm from '../components/login.component';
import RegisterForm from '../components/register.component';

const AuthPage = () => {
    const [logReg, setLogReg] = useState({login: true});
    const handleLogReg = () => {
        setLogReg({...logReg, login: !logReg.login })
    };

    return (
        <div className="containerAuth">
        <div className="d-flex justify-content-center wadah">
            <div className="card-body">
                {logReg.login ? <LoginForm /> : <RegisterForm handleLogReg={handleLogReg} />}
                <br/>
                <button
                    className="btn btn-outline-light btn-block"
                    onClick={handleLogReg}
                ><p className="textLogReg">{logReg.login ? 'Register' : 'Login'}</p></button>
            </div>
        </div>
        </div>
    );
}

export default AuthPage;