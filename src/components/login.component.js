import React, {useState} from 'react';
import { connect } from "react-redux";
import { useToasts } from 'react-toast-notifications'
import { useFormik } from "formik";
import { loginUser } from "../redux/actions/authActionCreators";

const initialValues = {
    username: '',
    password: ''
}
const validate = values => {
    let errors = {}
    if (!values.username) {
        errors.username = 'Username Required'
    }
    if (!values.password) {
        errors.password = 'Password Required'
    } else if (!/^[A-Z0-9]{5,}$/i.test(values.password)) {
        errors.password = 'Please input min 5 characters'
    }
    return errors
}

const LoginForm = ({ dispatchLoginAction }) => {
    // Formik
    const formik = useFormik({
        initialValues,
        validate 
    })
    console.log(formik.errors)

    // Toast Notifications
    const { addToast } = useToasts();

    // Show Password
    const [showPass, setShowPass] = useState({show: true});
    const handleShowPass = () => {
        setShowPass({...showPass, show: !showPass.show })
    };

    const OnSubmit = (event) => {
        event.preventDefault();
        dispatchLoginAction(formik.values.username, formik.values.password,
            () => addToast('Logged in Successfully', {appearance:'success'}),
            (message) => addToast(`Error: ${message}`, {appearance:'error'})
        )
    };
    
    return (
        <React.Fragment>
            <h4 className="d-flex textWarna justify-content-center mb-2">Login</h4>
            <form onSubmit={OnSubmit}>
                <div className="form-group">
                    <label className="textWarna" htmlFor="username">Username <span className="textRed">*</span></label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        required
                    />
                    {
                        formik.touched.username && formik.errors.username ? 
                        <p className="textRed">{formik.errors.username}</p> : null
                    }
                </div>
                <div className="form-group">
                    <label className="textWarna" htmlFor="password">Password <span className="textRed">*</span></label>
                    <input 
                        type={showPass.show ? "password" : "text"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        required minLength={5}
                    />
                    {
                        formik.touched.password && formik.errors.password ? 
                        <p className="textRed m-0">{formik.errors.password}</p> : null
                    }
                    <div class="form-check ml-1 mt-1">
                        <input onClick={handleShowPass} className="form-check-input" type="checkbox"/>
                        <label className="show">Show Password</label>
                    </div>
                </div>
                    <button type="submit" className="btn btn-success" style={{width:'100%'}}>
                        Login
                    </button>
            </form>
            <label className="textWarna mt-2">Not have an account?</label>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (username, password, onSuccess, onError) =>
        dispatch(loginUser({ username, password }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(LoginForm);