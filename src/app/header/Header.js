
import React from 'react';
import './header.scss'
import { NavLink } from "react-router-dom";

export default function Header() {

    const AdminMenuItems = () => {
        let navList = [
            {
                name: 'Home',
                to: '/home'
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
                                return (
                                    <NavLink to={val.to}><li id={index}>{val.name}</li></NavLink>
                                )
                            })
                        }

                    </ul>
                </nav>
            </div>
        </header>
    );
}
