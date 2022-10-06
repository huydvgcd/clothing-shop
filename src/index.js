import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Index from './component/Member/Index';
import Home from './component/Home';
import Blog from './component/Blog/Index';
import Detail from './component/Blog/Detail';
import UpdateMember from './component/Member/UpdateMember';
import MyProduct from './component/Product/MyProduct';
import AddProduct from './component/Product/AddProduct';
import EditProduct from './component/Product/EditProduct';
import Product from './component/Product/Index';
import ProductDetail from './component/Product/Detail';
import Cart from './component/Product/Cart';
import Wishlist from './component/Product/WishList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/blog/list' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<Detail/>}/>
          <Route path='/Login' element={<Index/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/Account' element={<UpdateMember/>}/>
          <Route path='/Account/MyProduct' element={<MyProduct/>}/>
          <Route path='/Account/AddProduct' element={<AddProduct/>}/>
          <Route path='/Account/EditProduct/:id' element={<EditProduct/>}/>
          <Route path='/Product/home' element={<Product/>}/>
          <Route path='/Product/detail/:id' element={<ProductDetail/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/WishList' element={<Wishlist/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

