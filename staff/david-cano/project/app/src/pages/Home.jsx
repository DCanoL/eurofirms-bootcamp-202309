import React, {useState} from 'react'
import { AllProducts, Header, Footer } from '../components'
import { Container } from '../library'

const Home = (props) => {
    const [timestamp, setTimestamp] = useState(null)
    return (
        <Container align="center">
            <Header />
            <AllProducts timestamp={timestamp} onError={props.onError} />
            <Footer />
        </Container>
    )
}

export default Home
