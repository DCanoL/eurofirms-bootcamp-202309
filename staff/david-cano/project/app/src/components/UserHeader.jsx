import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import { Link, Container, Button } from '../library'
import { useNavigate } from 'react-router-dom'
import logic from '../logic'

function UserHeader(props) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()


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
    }, [])

    function handleHomeClick(event) {
        event.preventDefault()

        navigate('/')
    }

    function handleLogoutClick() {
        props.onLogout()

        logic.logoutUser()
    }

    function handleMyOrdersClick(event) {
        event.preventDefault()

        navigate('/userOrders')
    }

    return (
        <Container align="center">
            <div className="fixed top-0 w-full flex justify-between items-center md:min-w-[500px] lg:min-w-[768px] bg-[#ededaa] rounded-3xl text-white" style={{
                backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfCJ2czLsLmWQqHTgBPzb3SVlebV653CeRjaiU-_CpZ5tsCux37eAtSffWPMmf20S8pA&usqp=CAU')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '70px',
            }} aria-label="Header">

                <Link onClick={handleHomeClick}>
                    <Logo />
                </Link>
                <h1>ECOMMERCE "BBB"</h1>

                <h2> Wellcome! {user && (
                    <span>{user.name}</span>
                )}</h2>

                <Button onClick={handleMyOrdersClick}>
                    My Orders
                </Button>

                <Button onClick={handleLogoutClick}>
                    Logout
                </Button>

            </div>
        </Container>
    )
}

export default UserHeader