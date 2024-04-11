import Container from "../library/Container"
import Field from "../library/Field"
import Form from "../library/Form"
import Button from "../library/Button"
import Footer from './Footer'
import AdminHeader from './AdminHeader'
import logic from '../logic'

function CreateNewProduct(props) {
    console.log("Create New Product")

    function handleNewProductSubmit(event) {
        event.preventDefault()

        const nameInput = event.target.querySelector("#name-field")
        const imgInput = event.target.querySelector("#img-field")
        const descriptionInput = event.target.querySelector("#description-field")
        const priceInput = event.target.querySelector("#price-field")

        const name = nameInput.value
        const img = imgInput.value
        const description = descriptionInput.value
        const price = priceInput.value

        try {
            logic.createNewProduct(name, img, description, price, error => {
                if (error) {
                    props.onError(error)

                    return
                }

                props.onNewProductSubmit()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    function handleCancelClick(event) {
        event.preventDefault()
        props.onNewProductCancelClick()
    }

    return (
        <Container align="center">
            <h2>Create New Product</h2>
<AdminHeader/>
            <Form onSubmit={handleNewProductSubmit}>
                <Field type="text" id="name-field" required>
                    Product Name
                </Field>

                <Field type="url" id="img-field" required>
                    Product Img
                </Field>

                <Field type="text" id="description-field" required>
                    Product Description
                </Field>

                <Field type="text" id="price-field" required>
                    Product Price
                </Field>

                <Button>Create New Product</Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
            </Form>
<Footer/>
        </Container>
    )
}

export default CreateNewProduct