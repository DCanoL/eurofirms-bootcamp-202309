import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'
import loginUser from './loginUser'
import registerUser from './registerUser'
import retrieveUser from './retrieveUser'
import logoutUser from './logoutUser'
import retrieveProducts from './retrieveProducts'
import addCartItem from './addCartItem'
import retrieveCartItems from './retrieveCartItems'
import createNewProduct from './createNewProduct'
import deleteProduct from './deleteProduct'
import retrieveProductsForUser from './retrieveProductsForUser'
import retrieveMyOrders from './retrieveMyOrders'

const logic = {
    getLoggedInUserId,
    isUserLoggedIn,
    loginUser,
    registerUser,
    retrieveUser,
    logoutUser,
    retrieveProducts,
    addCartItem,
    retrieveCartItems,
    createNewProduct,
    deleteProduct,
    retrieveProductsForUser,
    retrieveMyOrders
}

export default logic