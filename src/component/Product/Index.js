import axios from "axios";
import {useEffect, useState,useContext } from "react";
import { Link } from 'react-router-dom';
import { DataQtyContext } from '../../DataQtyContext';
function Product(){
    const[getItem,setItem] = useState([]);
    const[getDataCart,setDataCart] = useState({});
    const qty = useContext(DataQtyContext)
    const check = localStorage.getItem("true")
    useEffect(()=>{
    if(check){
        const userData = JSON.parse(localStorage.getItem("Information"));
        let accessToken = userData.success.token
        let config = {
                headers:{                                                                       
                'Authorization':'Bearer ' + accessToken,
                'Content-Type' : 'application/x-ww-form-urlencoded',
                'Accept' :  'application/json'
                }
        };
        axios.get("http://localhost/laravel/laravel/public/api/product/list", config)
        .then(res=>{
            setItem(res.data.data.data)
        })    
    }
    },[])
    function renderProduct(){
        if(Object.keys(getItem).length > 0){      
            return getItem.map((value,key)=>{
                let img = JSON.parse(value.image)
                  return(
                    <div class="col-sm-4">
						<div class="product-image-wrapper">
							<div class="single-products">
								<div class="productinfo text-center">
									<img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + "/" + img[0]}/>
									<h2>$56</h2>
									<p>{value.name}</p>
									<a  class="btn btn-default add-to-cart" onClick={addToCart} name={value.id} ><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                    <a  class="btn btn-default add-to-cart" ><Link to="/Product/detail" class="fa fa-shopping-cart">More</Link></a>
								</div>
								<div class="product-overlay">
									<div class="overlay-content">
										<h2>$56</h2>
										<p>{value.name}</p>
										<a  class="btn btn-default add-to-cart" onClick={addToCart} name={value.id}><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                        <a  class="btn btn-default add-to-cart"><Link to={"/Product/detail/" + value.id} class="fa fa-shopping-cart">More</Link></a>
									</div>
								</div>
							</div>
							<div class="choose">
								<ul class="nav nav-pills nav-justified">
									<li><a  onClick={addWishList} ><i class="fa fa-plus-square" ></i>Add to wishlist</a></li>
									<li><a ><i class="fa fa-plus-square"></i>Add to compare</a></li>
								</ul>
							</div>
						</div>
					</div>               
                  )
            })
      }
    }
    function addToCart(e){
        let nameId = e.target.name;
        let total = 0
        console.log(qty)
        if(getDataCart[nameId]){
            getDataCart[nameId] = parseInt(getDataCart[nameId]) + 1;
            setDataCart(state => ({...state,[nameId]:getDataCart[nameId]}))
        }
        else{
            getDataCart[nameId] = 1 
            setDataCart(state => ({...state,[nameId]:getDataCart[nameId]}))
        }
        if(getDataCart){
           localStorage.setItem('DataCart', JSON.stringify(getDataCart));
        }
        if(Object.keys(getDataCart).length > 0){
            
            Object.keys(getDataCart).map((item,key)=>{
                total += getDataCart[item]
            })
        }
        qty.getQty(total)
    }
    function addWishList(e){
        console.log(e)
    }
    return(
        <div>
            <div class="features_items">
					<h2 class="title text-center">Features Items</h2>
                    {renderProduct()}
            </div>
        </div>
    )
}
export default Product
