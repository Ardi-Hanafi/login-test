import React, {useState} from 'react';
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useFormik } from "formik";
import { registerUser } from "../redux/actions/authActionCreators";

// Formik
const initialValues = {
    firstName: '',
    lastName: '',
    usernameRg: '',
    passwordRg: ''
}
const validate = values => {
    let errors = {}
    if (!values.firstName) {
        errors.firstName = 'First Name Require'
    }
    if (!values.lastName) {
        errors.lastName = 'Last Name Require'
    }
    if (!values.usernameRg) {
        errors.usernameRg = 'Username Required'
    }
    if (!values.passwordRg) {
        errors.passwordRg = 'Password Required'
    } else if (!/^[A-Z0-9]{5,}$/i.test(values.passwordRg)) {
        errors.passwordRg = 'Please input min 5 characters'
    }
    return errors
}

const RegisterForm = ({ dispatchRegisterAction, handleLogReg }) => {
    // Formik
    const formik = useFormik({
        initialValues,
        validate 
    })

    // Toast Notifications
    const { addToast } = useToasts();

    const [role, setRole] = useState('User');

    // Show Password
    const [showPass, setShowPass] = useState({show: true});
    const handleShowPass = () => {
        setShowPass({...showPass, show: !showPass.show })
    };

    const OnSubmit = (event) => {
        event.preventDefault();
        dispatchRegisterAction(
            formik.values.firstName, formik.values.lastName, 
            formik.values.usernameRg, formik.values.passwordRg, role,
            () => addToast('User Created Successfully', {appearance:'success'}),
            (message) => addToast(`Error: ${message}`, {appearance:'error'}));
        handleLogReg();
    };

    return (
        <React.Fragment>
            <h4 className="d-flex textWarna justify-content-center mb-2">Register</h4>
            <form onSubmit={OnSubmit}>
                <div className="form-group">
                <label className="textWarna" htmlFor="username">First Name <span className="textRed">*</span></label>
                    <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        required
                    />
                    {
                        formik.touched.firstName && formik.errors.firstName ? 
                        <p className="textRed">{formik.errors.firstName}</p> : null
                    }
                </div>
                <div className="form-group">
                    <label className="textWarna" htmlFor="username">Last Name <span className="textRed">*</span></label>
                    <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        required
                    />
                    {
                        formik.touched.lastName && formik.errors.lastName ? 
                        <p className="textRed">{formik.errors.lastName}</p> : null
                    }
                </div>
                <div className="form-group">
                    <label className="textWarna" htmlFor="username">Username <span className="textRed">*</span></label>
                    <input
                        type="text"
                        id="usernameRg"
                        name="usernameRg"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.usernameRg}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        required
                    />
                    {
                        formik.touched.usernameRg && formik.errors.usernameRg ? 
                        <p className="textRed">{formik.errors.usernameRg}</p> : null
                    }
                </div>
                <div className="form-group">
                    <label className="textWarna" htmlFor="username">Password <span className="textRed">*</span></label>
                    <input 
                        type={showPass.show ? "password" : "text"}
                        id="passwordRg"
                        name="passwordRg"
                        placeholder="Password"
                        value={formik.values.passwordRg}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        required
                        minLength={5}
                    />
                    {
                        formik.touched.passwordRg && formik.errors.passwordRg ? 
                        <p className="textRed">{formik.errors.passwordRg}</p> : null
                    }
                    <div class="form-check ml-1 mt-1">
                        <input onClick={handleShowPass} className="form-check-input" type="checkbox"/>
                        <label className="show">Show Password</label>
                    </div>

                    {/* Input Role Value User */}
                    <input className="hide" id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" style={{width:'100%'}}>
                    Register
                </button>
            </form>
            <label className="textWarna mt-2">Already have an account?</label>
        </React.Fragment>
    );
};


const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (firstName, lastName, username, password, role, onSuccess, onError) =>
        dispatch(registerUser({ firstName, lastName, username, password, role }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(RegisterForm);