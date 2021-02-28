import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CustomerScreens/CartScreen'
import LoginScreen from './screens/CustomerScreens/LoginScreen'
import RegisterScreen from './screens/CustomerScreens/RegisterScreen'
import VendorLoginScreen from './screens/VendorScreens/VendorLoginScreen'
import VendorRegisterScreen from './screens/VendorScreens/VendorRegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileUpdateScreen from './screens/ProfileUpdateScreen'
import ProductListScreen from './screens/VendorScreens/ProductListScreen'
import ProductEditScreen from './screens/VendorScreens/ProductEditScreen'
import ProductCreateScreen from './screens/VendorScreens/ProductCreateScreen'
import AddressCreateScreen from './screens/CustomerScreens/AddressCreateScreen'
import AddressEditScreen from './screens/CustomerScreens/AddressEditScreen'
import PlaceOrderScreen from './screens/CustomerScreens/PlaceOrderScreen'
import CustomerOrderListScreen from './screens/CustomerScreens/CustomerOrderListScreen'
import CustomerOrderDetailsScreen from './screens/CustomerScreens/CustomerOrderDetailsScreen'
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
          <Route path='/profile' component={ProfileScreen} exact/>
          <Route path='/updateprofile' component={ProfileUpdateScreen} exact/>
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/vendors/:id?' component={VendorScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/vendor/productlist' component={ProductListScreen} exact/>
          <Route path='/vendor/productlist/:pageNumber' component={ProductListScreen} exact/>
          <Route path='/vendor/product/:id/edit' component={ProductEditScreen} exact/>
          <Route path='/vendor/addproduct' component={ProductCreateScreen} exact/>
          <Route path='/createaddress' component={AddressCreateScreen} exact/>
          <Route path='/editaddress/:id?' component={AddressEditScreen} exact/>
          <Route path='/placeorder' component={PlaceOrderScreen} exact/>
          <Route path='/myorders' component={CustomerOrderListScreen} exact/>
          <Route path='/myorders/:id' component={CustomerOrderDetailsScreen} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
