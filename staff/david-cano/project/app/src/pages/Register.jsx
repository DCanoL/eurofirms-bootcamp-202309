import { Button, Link, Field, Form, Container } from '../library'
import { Header, Footer } from '../components'
import logic from '../logic'

export default function Register(props) {
    console.log('Register')

    function handleRegisterSubmit(event) {
        event.preventDefault()

        const nameInput = event.target.querySelector('#name-field')
        const emailInput = event.target.querySelector('#email-field')
        const passwordInput = event.target.querySelector('#password-field')

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const role = 'regular'

        try {
            logic.registerUser(name, email, password, role, error => {
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

    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }

    return <Container align='center'>
        <Header />

        <h1>Register</h1>

<Form onSubmit={handleRegisterSubmit}>
    <Field type="text" id="name-field" title="Name" required>Name</Field>

    <Field type="email" id="email-field" title="E-mail" required>E-mail</Field>

    <Field type="password" id="password-field" title="Password" required>Password</Field>

    <Button type="submit">Register</Button>
</Form>

<Link onClick={handleLoginClick}>Login</Link>
        
        <Footer />
    </Container>
}
