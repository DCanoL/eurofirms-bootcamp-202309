import { Button, Link, Field, Form, Container } from '../library'
import { Header, Footer } from '../components'
import logic from '../logic'

export default function Login(props) {
    console.log('Login')

    function handleLoginSubmit(event) {
        event.preventDefault()

        const emailInput = event.target.querySelector('#email-field')
        const passwordInput = event.target.querySelector('#password-field')

        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(email, password, (error) => {
                if (error) {
                    props.onError(error)

                    return
                }

                props.onSuccess()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    return (
        <Container align="center">
            <Header />
                <h1>Login</h1>

                <Form onSubmit={handleLoginSubmit}>
                    <Field type="email" id="email-field" title="E-mail" required>E-mail</Field>

                    <Field type="password" id="password-field" title="Password" required>Password</Field>

                    <Button type="submit">Login</Button>
                </Form>

                <Link onClick={handleRegisterClick}>Register</Link>
            

                <Footer />
            
        </Container>
    )
}
