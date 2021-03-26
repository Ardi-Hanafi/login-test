import React, { useState, useEffect } from "react";
import "../App.css";
import { connect } from "react-redux";
import { updateUserById, getUserByid } from "../redux/actions/authActionCreators";
import { useToasts } from "react-toast-notifications";

const EditUser = ({ match, history, dispatchUpdateUserAction, dispatchGetUserByIdAction }) => {
    // Toast
    const { addToast } = useToasts();

    // Show Password
    const [showPass, setShowPass] = useState({show: true});
    const handleShowPass = () => {
        setShowPass({...showPass, show: !showPass.show })
    };

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('USER_INFO'))
        if(user.userId) {
            dispatchGetUserByIdAction(user.userId, ({ firstName, lastName, username, password }) => 
            {
                setFirstName(firstName);
                setLastName(lastName);
                setUsername(username);
                setPassword(password);
            });
        }
    }, [dispatchGetUserByIdAction, match.params]);

    // Handle On Submit
    const handleOnSubmit = event => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('USER_INFO'));
        const data = { firstName, lastName, username, password };
        if (user.userId) {
        dispatchUpdateUserAction(user.userId, data, () => {
            addToast('Update User Successfully', {appearance:'success'});
            history.replace('/data')
        }, (message) => addToast(`Error: ${message}`, {appearance:'error'}))
        };
    };

    // Handle On Cancle
    const handleOnCancle = () => {
        history.replace('/data');
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleOnSubmit} className="wadah p-4">
                <h4 className="textWarna tengah mb-3">Edit User</h4>
                <div className="form-group">
                    <label className="textWarna">First Name</label>
                    <input 
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="form-control" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="textWarna">Last Name</label>
                    <input
                        id="lastName" 
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="form-control" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="textWarna">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username" 
                        className="form-control" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="textWarna">Password</label>
                    <input
                        id="password"
                        name="password"
                        type={showPass.show ? "password" : "text"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        className="form-control" 
                        required minLength={5}
                    />
                    <div class="form-check ml-1 mt-1">
                        <input onClick={handleShowPass} className="form-check-input" type="checkbox"/>
                        <label className="show">Show Password</label>
                    </div>
                </div>
                <div className="col p-0 justify-content-between d-flex">
                    <button onClick={handleOnCancle} className="btn btn-warning textWarna btn-block" style={{width:'48%'}}>Cancle</button>
                    <button type="submit" className="btn btn-success" style={{width:'48%'}}>Save</button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchUpdateUserAction: (id, data, onSuccess, onError) => 
        dispatch(updateUserById(id, data, onSuccess, onError)),
    dispatchGetUserByIdAction: (id, onSuccess) => 
        dispatch(getUserByid(id, onSuccess))
});
export default connect(null, mapDispatchToProps)(EditUser);