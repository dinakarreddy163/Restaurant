
import React from 'react';
import './header.scss'
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../utils/loginSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
const navigate = useNavigate();
const dispatch = useDispatch();
    const AdminMenuItems = () => {
        let navList = [
            {
                name: 'Home',
                to: '/admin'
            },
            {
                name: 'Employee',
                to: '/employee'
            },
            {
                name: 'Items',
                to: '/items'
            },
            {
                name: 'Billing',
                to: '/billing'
            },
            {
                name: 'Logout',
                logout: () => {
                    dispatch(logout());
                    navigate("/login");
                }
            }
        ]

        return navList;
    }
    return (
        <header>
            <div className='container'>
                <nav className='nav'>
                    <div>
                        <span className='logoName'>Logo</span>
                    </div>
                    <ul className='list'>
                        {
                            AdminMenuItems().map((val, index) => {
                                if (val.name == 'Logout') {
                                    return (
                                        <NavLink onClick={val.logout}><li>{val.name}</li></NavLink>
                                    )
                                } else {
                                    return (
                                        <NavLink key={index} to={val.to}><li>{val.name}</li></NavLink>
                                    )
                                }
                            })
                        }

                    </ul>
                </nav>
            </div>
        </header>
    );
}
