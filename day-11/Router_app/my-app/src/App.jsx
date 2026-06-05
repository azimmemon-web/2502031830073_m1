import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';    
import About from './About';
import Contact from './Contact';
import Products from './Product'; // 'P' capital kiya
import Phone from './Phone';
import Laptop from './Laptop';

function App() {
  function User() {
    return <h2>User Page</h2>;
  } 

  return (
    <BrowserRouter>
      <h1>React Router Example</h1>

      <nav style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link> |{' '}
        <Link to="/user/10">User</Link> |{' '}
        <Link to="/products">Products</Link>
      </nav>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/user/:id' element={<User />} /> 
        
        {/* Nested Routing taaki Products page ke andar Phone/Laptop khule */}
        <Route path='/products' element={<Products />}>
          <Route path='phone' element={<Phone />} />
          <Route path='laptop' element={<Laptop />} />
        </Route>

        {/* Alag se bhi agar koi direct jana chahe */}
        <Route path='/phone' element={<Phone />} />
        <Route path='/laptop' element={<Laptop />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;