import React from "react";
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastProvider } from 'react-toast-notifications';
import AuthPage from './pages/authpage.component';
import DataPage from './pages/datapage.component';
import EditDataPage from './pages/editdatapage.component';
import EditUserPage from './pages/edituser.component';
import UserPage from "./pages/userpage.component";
import EditUserAdmin from "./pages/edituseradmin.component";
import Header from './components/header.component';
import Spinner from "./components/spinner/spinner.component";
import { logoutUser } from "./redux/actions/authActionCreators";

const App = ({ user, dispatchLogoutAction }) => {
  const info = JSON.parse(localStorage.getItem('USER_INFO'));

  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="top-right"
    >
      <div>
        <div className="bg"></div>
        <Spinner />
        <Header 
          isLoggendIn={user.isLoggendIn} 
          fullName={user.fullName}
          onLogout={dispatchLogoutAction}
        />
        <div className="d-flex justify-content-center containerAll">
          {!user.isLoggendIn ?
            (<Switch>
              <Route exact path="/user" component={AuthPage} />
              <Redirect to="/user" />
            </Switch>) :
            (<Switch>
              <Route exact path="/data" component={DataPage} />
              <Route exact path="/edit-data" component={EditDataPage} />
              <Route exact path="/edit-data/:dataId" component={EditDataPage} />
              <Route exact path="/edit-user" component={EditUserPage} />
              { info.role === 'Admin' &&
              (<Route exact path="/user-control" component={UserPage} />)}
              { info.role === 'Admin' &&
              (<Route exact path="/edit-user-admin" component={EditUserAdmin} />)}
              { info.role === 'Admin' &&
              (<Route exact path="/edit-user-admin/:userId" component={EditUserAdmin} />)}
              <Redirect to="/data" />
            </Switch>)
          }
        </div>
      </div>
    </ToastProvider>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);