import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import UserOrders from './pages/UserOrders'

import { CreateNewProduct } from './components'
import CartContext from './components/CartContext'

import logic from './logic'
import { CredentialsError, JWTError, SystemError } from './logic/errors'
import context from './logic/context'

import Feedback from './library/Feedback'

function App() {
  console.log('App')

  const [feedback, setFeedback] = useState(null)
  const [user, setUser] = useState(null)
  const [cartProducts, setCartProducts] = useState([])

  const {jwt} = context

  const token = jwt?.token

  const navigate = useNavigate()

  function handleHomeShow() {
    navigate('/')
    setFeedback(null)
  }

  function handleRegisterShow() {
    navigate('/register')
    setFeedback(null)
  }

  function handleLoginSuccess() {
    try {
      logic.retrieveUser((error, user) => {
        if (error instanceof SystemError) {
          new SystemError(error.message)
        }

        if (user.role === 'admin') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }

        setUser(user)
      })
    } catch (error) {
      new SystemError(error.message)
    }

    setFeedback(null)
  }

  useEffect(() => {
    if (token)
      retrieveUserCart()
  }, [token])

  const retrieveUserCart = () => {
    try {
      logic.retrieveCartItems((error, cartProducts) => {
        if (error) {
          handleError(error)

          return
        }

        setCartProducts(cartProducts)
      })
    } catch (error) {
      handleError(error)
    }
  }

  function handleLoginShow() {
    navigate('/login')
    setFeedback(null)
  }

  function handleNewProductSubmit() {
    navigate("/dashboard")
  }

  function handleNewProductCancelClick() {
    navigate("/dashboard")
  }

  function handleUserOrders() {
    navigate("/userOrders")
  }

  function handleCartItemAdd() {
    retrieveUserCart()
  }

  function handleError(error) {
    if (error instanceof JWTError) {
      logic.logoutUser()

      navigate('/login')
      setFeedback('Session expired, please login again')
    } else if (error instanceof CredentialsError) {
      setFeedback('Wrong credentials, try again')
    } else if (error instanceof SystemError) {
      setFeedback('Something went wrong. Please, try again later')
    }
    else setFeedback(error.message)
  }

  function handleAcceptFeedback() {
    setFeedback(null)
  }

  return (
    <>
      <CartContext.Provider value={cartProducts}>
        <Routes>
          <Route path='/' element={<Home onError={handleError} />} />
          <Route path='/cart/*' element={<Cart onLogout={handleHomeShow} onCartItemAdd={handleCartItemAdd} onCheckOut={handleUserOrders} onError={handleError} />} />

          <Route path="/register" element={<Register onSuccess={handleLoginShow} onLoginClick={handleLoginShow} onError={handleError} />} />

          <Route path="/login" element={<Login onSuccess={handleLoginSuccess} onRegisterClick={handleRegisterShow} onError={handleError} />} />

          <Route path='/dashboard/*' element={<Dashboard onLogout={handleHomeShow} onError={handleError} />} />

          <Route path='/userOrders/*' element={<UserOrders  onError={handleError} />} />

          <Route path='/new-product' element={<CreateNewProduct onNewProductCancelClick={handleNewProductCancelClick} onNewProductSubmit={handleNewProductSubmit} onError={handleError} />} />
        </Routes>
      </CartContext.Provider>


      {feedback ? <Feedback message={feedback} onAccept={handleAcceptFeedback} /> : null}
    </>
  )
}

export default App
