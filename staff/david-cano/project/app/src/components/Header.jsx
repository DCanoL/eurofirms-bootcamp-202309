import React from 'react'
import Logo from './Logo'
import { Link, Container, Button } from '../library'
import { useNavigate } from 'react-router-dom'
import logic from '../logic'
import { useState } from 'react'
import { useEffect } from 'react'

function header() {
    const [user, setUser] = useState(null);
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
    }, []);

    function handleHomeClick(event) {
        event.preventDefault()

        navigate('/')
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        if (!user) {
            navigate('/register')
        }
    }

    function handleLoginClick(event) {
        event.preventDefault()

        if (!user) {
            navigate('/login')
        }
    }

    function handleMyOrdersClick(event) {
        event.preventDefault()

        navigate('/userOrders')
    }

    function handleCartClick() {
        if (user && user.role === 'regular') {
            navigate('/cart')
        } else if (user && user.role === 'admin') {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
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
                {!user && (
                    <>
                        <Link onClick={handleRegisterClick} className="text-white underline">
                            Register
                        </Link>
                        <Link onClick={handleLoginClick} className="text-white underline">
                            Login
                        </Link>
                    </>
                )}

                <h2> Wellcome! {user && (
                    <span>{user.name}</span>
                )}</h2>

                {user && (
                    <Button onClick={handleMyOrdersClick}>
                        My Orders
                    </Button>
                )}
                <Link onClick={handleCartClick}>
                    <h1>
                        <img className='rounded-full' width='50px' height='50px' src="data:image/jpeg;base64,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" alt="Carrito" />
                    </h1>
                </Link>
            </div>
        </Container>
    )
}
export default header