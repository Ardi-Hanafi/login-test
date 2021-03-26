import React, { useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useToasts } from 'react-toast-notifications';

import { deleteDataById } from '../redux/actions/datasActionCreators';

const DataCollection = ({ datas, dispatchDeleteAction }) => {
    const { addToast } = useToasts();
    const [selectedData, setSelectedData] = useState('');
    const [searchTerm, setSearchTerm] = useState('')
    // const [staticSearch, setStaticSearch] = useState('');

    const showConfirmationModal = (event, id) => {
        event.preventDefault();
        setSelectedData(id);
        window.$('#confirmationModal').modal('show');
    };

    const handleOnDelete = () => {
        dispatchDeleteAction(selectedData, () => {
            window.$('#confirmationModal').modal('hide');
            addToast('Data deleted Successfully!', {appearance:'warning'});
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            addToast(`Error: ${message}`, {appearance:'error'});
        });
    };
    
    return (
        <React.Fragment>
            <div className="container d-flex row" style={{marginTop:-30}}>
                {/* TITLE */}
                <div className="containerTitle">
                    <div>
                        <h2 style={{color:'white'}}>Blood Data Management</h2>
                    </div>
                    <div>
                        <Link to="/edit-data" className="btn btn-full btn-primary">
                            Add Blood Data <i className="fas fa-plus"/>
                        </Link>
                    </div>
                </div>
                {/* DINAMIS FORM SEARCH */}
                <div className="p-0 mt-4">
                    <input 
                        class="form-control" 
                        list="bloodListOptions" 
                        placeholder="Type to search..."
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                        <datalist id="bloodListOptions">
                            <option value="A-"/>
                            <option value="A+"/>
                            <option value="B-"/>
                            <option value="B+"/>
                            <option value="AB-"/>
                            <option value="AB+"/>
                            <option value="O-"/>
                            <option value="O+"/>
                        </datalist>
                </div>
                {/* STATIC FORM SEARCH */}
                {/* <form className="mt-2 p-0">
                    <div class="input-group">
                        <input id="staticSearch" 
                            type="text" 
                            class="form-control" 
                            placeholder="Search Full Name..."
                            value={staticSearch}
                            onChange={e => setStaticSearch(e.target.value)}
                        />
                        <button class="btn btn-primary" type="submit" id="button-addon2">Search</button>
                    </div>
                </form> */}
                <table className="table table-bordered table-hover mt-3 mb-5">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><p className="tengah">Blood Group</p></th>
                            <th scope="col"><p className="tengah">Age</p></th>
                            <th scope="col"><p className="tengah">Full Name</p></th>
                            <th scope="col"><p className="tengah">Mobile</p></th>
                            <th scope="col"><p className="tengah">Email</p></th>
                            <th scope="col"><p className="tengah">Address</p></th>
                            <th scope="col"><p className="tengah">Action</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.filter((item) => {
                                if (searchTerm === "") {
                                    return item
                                } else if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return item
                                } else if (item.mobile.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return item
                                } else if (item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return item
                                } else if (item.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return item
                                } else if (item.address.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return item
                                } else if (item.age.toString().includes(searchTerm.toString())) {
                                    return item
                                }
                            }).map((item, index) => (
                                <tr key={index} className="table-secondary">
                                    <td><p className="tengah">{item.bloodGroup}</p></td>
                                    <td><p className="tengah">{item.age}</p></td>
                                    <td>{item.fullName}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td className="tengah">
                                        <div className="btn-group btn-group-sm">
                                            <Link to={`/edit-data/${item.id}`} className="btn btn-outline-secondary" title="Edit Data" >
                                                <i className="far fa-edit" color="#212529"/>
                                            </Link>
                                            <button onClick={(e) => showConfirmationModal(e,item.id)} className="btn btn-outline-secondary" title="Delete Data">
                                                <i className="far fa-trash-alt" color="#212529"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
                <Modal handleOnDelete={handleOnDelete} />
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (id, onSuccess, onError) => 
    dispatch(deleteDataById(id, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(DataCollection);

const Modal =({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title textModal">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p className="textModal">Are you sure, you want to delete this data?</p>
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