import React from 'react'
import AdminLogo from './AdminLogo'
import { Container, Button } from '../library'
import logic from '../logic'
import { useState, useEffect } from 'react'

function AdminHeader(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const isLoggedIn = logic.isUserLoggedIn(); 
        if (isLoggedIn) {
            logic.retrieveUser((error, user) => { 
                if (error) {
                    console.error(error);
                    return;
                }
                setUser(user);
            });
        }
    }, []);

    function handleLogoutClick() {
        props.onLogout()

        logic.logoutUser()
    }

    return (
        <Container align="center">
        <div className="fixed top-0 w-full flex justify-between items-center md:min-w-[500px] lg:min-w-[768px] bg-[#ededaa] rounded-3xl" aria-label="Header">

                <AdminLogo />
                <h1>ECOMMERCE "BBB"</h1>
            
                <h2 className='pr-[5px]'> Wellcome! {user && (
                    <span>{user.name}</span>
                )}</h2>

            <Button onClick={props.onNewProductClick}>
                Create New Product
            </Button>

            <Button onClick={handleLogoutClick}>
                Logout
            </Button>
        </div>
        </Container>
    )
}

export default AdminHeader