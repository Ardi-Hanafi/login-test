// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import UserCollection from "../components/usercollection.component";
// import { fetchAllUsers } from "../redux/actions/userActionCreator";

// const UserPage = ({ loading, admins, dispatchFetchAllUsersAction }) => {

//     useEffect(() => dispatchFetchAllUsersAction(), [dispatchFetchAllUsersAction]);

//     return (
//         <React.Fragment>
//             <UserCollection admins={admins} />
//         </React.Fragment>
//     );
// };

// const mapStateToProps = state => ({
//     loading: state.loading,
//     users: state.users
// });
// const mapDispatchToProps = dispatch => ({
//     dispatchFetchAllUsersAction: () => dispatch(fetchAllUsers())
// });
// export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserCollection from '../components/usercollection.component';
import { fetchAllUsers } from "../redux/actions/userActionCreator";

const UserPage = ({ loading, admins, dispatchFetchAllUsersAction }) => {
    
    useEffect(() => dispatchFetchAllUsersAction(), [dispatchFetchAllUsersAction]);

    return (
        <React.Fragment>
            <UserCollection admins={admins} />
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    loading: state.loading,
    admins: state.admins
});
const mapDispatchToProps = dispatch => ({
    dispatchFetchAllUsersAction: () => dispatch(fetchAllUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);