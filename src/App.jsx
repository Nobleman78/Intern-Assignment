import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductList from './Pages/ProductList'
import ProductDetails from './Pages/ProductDetails'
import Navbar from './components/Navbar'
import Cart from './Pages/Cart'

function App() {
  return (
    <div className='sm:max-w-7xl mx-auto'>
      <Navbar />
      <Routes>
        <Route path='/products' element={<ProductList />}></Route>
        <Route path='/products/:slug' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<Cart />}></Route>

      </Routes>
    
    </div>
  )
}

export default App