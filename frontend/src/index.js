// import React from 'react'
// import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import store from './store'
// import './bootstrap.min.css'
// import './index.css'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
// import App from './App'


// const persistor = persistStore(store)

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate persistor={persistor}> 
//     <App />
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// )

  
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './bootstrap.min.css'
import './index.css'
import App from './App'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
