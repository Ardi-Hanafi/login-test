import React from 'react';
import { Link } from "react-router-dom";


const Header = ({ fullName, isLoggendIn, onLogout }) => {
  
  const status = JSON.parse(localStorage.getItem('USER_INFO'));
  
  return (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i className="fas fa-chart-bar fa-2x"/>
                    <span className="h4 pl-2">
                        { isLoggendIn ?
                        "Data Management" : "Login To Your Account" }
                    </span>
                </div>
            </Link>
            { isLoggendIn && 
                <div class="dropdown">
                  <button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user-alt mr-2"/>{fullName}
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="dropdownMenuButton2">
                    <li><a class="dropdown-item" href="/edit-user">
                      <i className="fas fa-user-edit mr-1"/>
                      {fullName}
                    </a></li>
                    { status.role === 'Admin' && 
                    <li><a class="dropdown-item" href="/user-control">
                      <i className="fas fa-database mr-2"/>
                      User Control
                    </a></li>
                    }
                    <li><button type="button" onClick={onLogout} className="btn dropdown-item">
                          <a style={{color:'#ffc107', fontWeight:'bold'}}><i className="fas fa-sign-out-alt mr-2" color="#ffc107"/>Logout</a>
                        </button>
                    </li>
                  </ul>
              </div>
            }
        </div>
    </nav>
)};

export default Header;