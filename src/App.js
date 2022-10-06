import React, { useState, useEffect } from 'react';
import Header from "./component/Layout/Header";  
import './App.css';
import Footer from './component/Layout/Footer';
import MenuLeft from './component/Layout/MenuLeft';
import { useLocation } from 'react-router-dom';
import Account from './component/Layout/Account';
import {DataQtyContext} from './DataQtyContext'


function App(props){
  let params = useLocation();
  const [DataQty,setDataQty] = useState('')

  function getQty(xx){
    setDataQty(xx)
    console.log(xx)
  }
  
  return(
    <DataQtyContext.Provider value={{
      DataQty:DataQty,
      getQty:getQty
      }}>
      <>
      <Header/> 
        <section>
          <div className="container">
            <div className="row">
              {params['pathname'].includes("Account") ? <Account/> : <MenuLeft/>}
              {/* {params['pathname'].includes("Cart") ? "" : <MenuLeft/>} */}
              {props.children} 
            </div>
          </div> 
        </section>
      <Footer/>  
      </>
    </DataQtyContext.Provider>
    
    
  )
}

export default App;
