import React, { useState, useEffect } from "react";
import '../App.css'
import { connect } from "react-redux";
import { createData, getDataByid, updateDataById } from "../redux/actions/datasActionCreators";
import { useToasts } from 'react-toast-notifications'

const EditDataPage = ({ match, history, dispatchCreateDataAction, dispatchGetDataByIdAction, dispatchUpdateDataAction }) => {
    // Toast Notification
    const { addToast } = useToasts();

    const [bloodGroup, setBloodGroup] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')

    useEffect(() => {
        const { dataId } = match.params;
        if(dataId) {
            dispatchGetDataByIdAction(dataId, ({ fullName, mobile, email, age, bloodGroup, address }) => 
            {
                setFullName(fullName);
                setMobile(mobile);
                setEmail(email);
                setAge(age);
                setBloodGroup(bloodGroup);
                setAddress(address);
            });
        }
    }, [dispatchGetDataByIdAction, match.params]);
    const data = { fullName, mobile, email, age, bloodGroup, address };
    console.log(data);
    const handleOnSubmit = event => {
        event.preventDefault();
        const { dataId } = match.params;
        const data = { fullName, mobile, email, age, bloodGroup, address };
        if(dataId) {
            dispatchUpdateDataAction(dataId, data, () => {
                addToast('Update Data Successfully', {appearance:'info'});
                history.replace('/datas');
            }, (message) => addToast(`Error: ${message}`, {appearance:'error'}));
        // } else if (!data == "") {
        //     addToast('Please insert Data', {appearance:'warning'})
        } else {
            dispatchCreateDataAction(data, () => {
                addToast('Create Data Successfully', {appearance:'success'});
                history.replace('/datas');
            }, (message) => addToast(`Error: ${message}`, {appearance:'error'}));
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center wadah" style={{width:450}}>
                <div className="col-10 my-4">
                    <h4 className="mb-4 textWarna textEdit">Edit Data</h4>
                    <form noValidate onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="fullname">Full Name</label>
                            <input noValidate id="fullname"
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="mobile">Mobile</label>
                            <input noValidate id="mobile"
                                type="text"
                                placeholder="Mobile"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="email">Email</label>
                            <input noValidate id="email"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="age">Age</label>
                            <input noValidate id="age"
                                type="number"
                                placeholder="Age"
                                name="age"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value,10))}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="bloodGroup">Blood Group</label>
                            <select noValidate id="bloodGroup"
                                name="bloodGroup"
                                className="form-control"
                                value={bloodGroup}
                                required
                                onChange={(e) => setBloodGroup(e.target.value)}>
                                    <option>Select</option>
                                    <option value="A-">A-</option>
                                    <option value="A+">A+</option>
                                    <option value="B-">B-</option>
                                    <option value="B+">B+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="O-">O-</option>
                                    <option value="O+">O+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="textWarna" htmlFor="address">Address</label>
                            <input noValidate id="address"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary mr-2 btn-block">
                                Save
                            </button>
                            <button 
                                onClick={() => history.replace("/data")}
                                type="button" 
                                className="btn btn-warning mr-2 btn-block">
                                <p style={{color:'white', margin:0}}>Cancle</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-4 px-4"></div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchCreateDataAction: (data, onSuccess, onError) =>
        dispatch(createData(data, onSuccess, onError)),
    dispatchUpdateDataAction: (id, data, onSuccess, onError) =>
        dispatch(updateDataById(id, data, onSuccess, onError)),
    dispatchGetDataByIdAction: (id, onSuccess) => 
        dispatch(getDataByid(id, onSuccess))
});
export default connect(null, mapDispatchToProps)(EditDataPage);