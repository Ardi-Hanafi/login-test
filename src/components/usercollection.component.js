import React, { useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useToasts } from 'react-toast-notifications';

import { deleteUserById } from "../redux/actions/userActionCreator";

const UserCollection = ({ admins, dispatchDeleteAction }) => {
    const { addToast } = useToasts();
    const [selectedData, setSelectedData] = useState('');
    const [searchTerm, setSearchTerm] = useState('')

    const showConfirmationModal = (event, id) => {
        event.preventDefault();
        setSelectedData(id);
        window.$('#confirmationModal').modal('show');
    };

    const handleOnDelete = () => {
        dispatchDeleteAction(selectedData, () => {
            window.$('#confirmationModal').modal('hide');
            addToast('User Delete Successfully!', {appearance:'warning'});
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            addToast(`Error: ${message}`, {appearance:'error'});
        });
    };


    return (
        <React.Fragment>
            <div className="container d-flex row" style={{marginTop:-30}}>
                <div className="containerTitle">
                    <div>
                        <h2 style={{color:'white'}}>User Control</h2>
                    </div>
                    <div>
                        <Link to="/edit-user-admin" className="btn btn-full btn-primary">
                            Add User <i className="fas fa-plus"/>
                        </Link>
                    </div>
                </div>
                <div className="p-0 mt-4">
                    <input 
                        class="form-control" 
                        list="roleListOptions" 
                        placeholder="Type to search..."
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                        <datalist id="roleListOptions">
                            <option value="Admin"/>
                            <option value="User"/>
                        </datalist>
                </div>
                <table className="table table-bordered table-hover mt-3 mb-5">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><p className="tengah">Id</p></th>
                            <th scope="col"><p className="tengah">Username</p></th>
                            <th scope="col"><p className="tengah">First Name</p></th>
                            <th scope="col"><p className="tengah">Last Name</p></th>
                            <th scope="col"><p className="tengah">Role</p></th>
                            <th scope="col"><p className="tengah">Action</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.filter((admin) => {
                                if (searchTerm === "") {
                                    return admin
                                } else if (admin.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return admin
                                } else if (admin.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return admin
                                } else if (admin.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return admin
                                } else if (admin.role.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return admin
                                }else if (admin.id.toString().includes(searchTerm.toString())) {
                                    return admin
                                }
                            }).map((admin, index) => (
                                <tr key={index} className="table-secondary">
                                    <td><p className="tengah">{admin.id}</p></td>
                                    <td>{admin.username}</td>
                                    <td>{admin.firstName}</td>
                                    <td>{admin.lastName}</td>
                                    <td><p className="tengah">{admin.role}</p></td>
                                    <td className="tengah">
                                        <div className="btn-group btn-group-sm">
                                            <Link 
                                            to={`/edit-user-admin/${admin.id}`}
                                             className="btn btn-outline-secondary" title="Edit Data" >
                                                <i className="far fa-edit" color="#212529"/>
                                            </Link>
                                            <button 
                                            onClick={(e) => showConfirmationModal(e,admin.id)}
                                             className="btn btn-outline-secondary" title="Delete Data">
                                                <i className="far fa-trash-alt" color="#212529"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/* <div className="container row m-0" style={{backgroundColor:'white', padding:100}}>
                    <div className="container-btn mr-5">
                        <div className="btn btn-cuss"><span>Button</span></div>
                    </div>
                    <div className="container-btn">
                        <div className="btn btn-cuss"><span>Button</span></div>
                    </div>
                </div> */}
                 
                <Modal handleOnDelete={handleOnDelete} />
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (id, onSuccess, onError) => 
    dispatch(deleteUserById(id, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(UserCollection);

const Modal =({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title textModal">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p className="textModal">Are you sure, you want to delete this user?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-bs-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" onClick={handleOnDelete} data-dismiss="modal" className="btn btn-warning">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);