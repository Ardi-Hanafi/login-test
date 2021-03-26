import React, { useState, useEffect } from "react";
import '../App.css'
import { connect } from "react-redux";
import { getUserById, updateUserById } from "../redux/actions/userActionCreator";
import { registerUser } from "../redux/actions/authActionCreators";
import { useToasts } from 'react-toast-notifications';


const EditUserPage = ({ match, history, dispatchGetUserByIdAction, dispatchUpdateUserByIdAction, dispatchRegisterAction }) => {
    const { addToast } = useToasts();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    // Show Password
    const [showPass, setShowPass] = useState({show: true});
    const handleShowPass = () => {
        setShowPass({...showPass, show: !showPass.show })
    };

    useEffect(() => {
        const { userId } = match.params;
        if(userId) {
            dispatchGetUserByIdAction(userId, ({ firstName, lastName, username, password, role }) =>
            {
                setFirstName(firstName);
                setLastName(lastName);
                setUsername(username);
                setPassword(password);
                setRole(role);
            });
        }
    }, [dispatchGetUserByIdAction, match.params]);

    const handleOnSubmit = event => {
        event.preventDefault();
        const { userId } = match.params;
        const data = { firstName, lastName, username, password, role };
        if(userId) {
            dispatchUpdateUserByIdAction(userId, data, () => {
                addToast('Update User Successfully', {appearance:'info'});
                history.replace('/user-control');
            }, (message) => addToast(`Error: ${message}`, {appearance:'error'}));
        } else if (data.password == "") {
            addToast('Please insert Password', {appearance:'warning'})
        } else {
            dispatchRegisterAction(
                firstName, lastName, username, password, role, () => {
                addToast('User Create Successfully', {appearance:'success'});
                history.replace('/user-control')},
                (message) => addToast(`Error: ${message}`, {appearance:'error'}),
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center wadah mb-5" style={{width:450}}>
                <div className="col-10 my-4">
                    <h4 className="mb-4 textWarna textEdit">Edit User</h4>
                    <form  onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="firstName">First Name</label>
                            <input  id="firstName"
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="lastName">Last Name</label>
                            <input  id="lastName"
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="username">Username</label>
                            <input  id="username"
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-0">
                            <label className="textWarna" htmlFor="password">Password</label>
                            <input  id="password"
                                type={showPass.show ? "password" : "text"}
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                minLength={5}
                            />
                            <div class="form-check ml-1 mt-1">
                                <input onClick={handleShowPass} className="form-check-input" type="checkbox"/>
                                <label className="show">Show Password</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="role">Role</label>
                            <select  id="role"
                                name="role"
                                className="form-control"
                                value={role}
                                required
                                onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary mr-2 btn-block">
                                Save
                            </button>
                            <button 
                                onClick={() => history.replace("/user-control")}
                                type="button" 
                                className="btn btn-warning mr-2 btn-block">
                                <p style={{color:'white', margin:0}}>Cancle</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchGetUserByIdAction: (id, onSuccess) =>
        dispatch(getUserById(id, onSuccess)),
    dispatchUpdateUserByIdAction: (id, data, onSuccess, onError) =>
        dispatch(updateUserById(id, data, onSuccess, onError)),
    dispatchRegisterAction: ( firstName, lastName, username, password, role, onSuccess, onError) =>
        dispatch(registerUser({ firstName, lastName, username, password, role }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(EditUserPage);