import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VendorLoginScreen from './screens/VendorLoginScreen'
import VendorRegisterScreen from './screens/VendorRegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import VendorScreen from './screens/VendorScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/register' component={RegisterScreen} exact/>
          <Route path='/login/vendor' component={VendorLoginScreen} exact/>
          <Route path='/register/vendor' component={VendorRegisterScreen} exact/>
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/vendors/:id?' component={VendorScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
