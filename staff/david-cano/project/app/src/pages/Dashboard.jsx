import React from 'react'
import { AllProducts, AdminHeader, Footer, CreateNewProduct } from '../components'
import { Container } from '../library'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Dashboard(props) {
    console.log('Dashboard')

    const [timestamp, setTimestamp] = useState(null)
    const navigate = useNavigate()

    function handleNewProductClick() {
        setTimestamp(Date.now())
        navigate('/new-product')
    }

    return <Container align="center">
            <AdminHeader onNewProductClick={handleNewProductClick} onLogout={props.onLogout} />

            <Routes>
                <Route path="/new-product" element={<>
                    <CreateNewProduct onNewProductSubmit={props.onNewProductSubmit} onNewProductCancelClick={props.onNewProductCancelClick} onError={props.onError} />
                    <AllProducts timestamp={timestamp} onError={props.onError} />
                </>} /> 

                <Route path="/" element={<AllProducts timestamp={timestamp} onError={props.onError} />} />
                </Routes>

            <Footer />
        </Container>
}
