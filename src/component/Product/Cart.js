import axios from "axios";
import {useEffect, useState } from "react";
function Cart(params){
	const[getDataCart, setDataCart] = useState([])
	const[getSum,setSum] = useState()
	useEffect(()=>{
            let DataCart = JSON.parse(localStorage.getItem("DataCart"));
            axios.post("http://localhost/laravel/laravel/public/api/product/cart",DataCart)
            .then(res=>{
				setDataCart(res.data.data)
            })    
	},[])
	
   
	function renderDataCart(){
        if(getDataCart.length > 0){    
			let sum = 0  
            return getDataCart.map((value,key)=>{
               let img = JSON.parse(value.image)
			   let total = value.price * value.qty
				return(
					<tr>
							<td class="cart_product">
								<a>
									<img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + "/" + img[0]} width="100" height="100"/>
								</a>
							</td>
							<td class="cart_description">
								<h4><a>{value.name}</a></h4>
								<p>Web ID: {value.id}</p>
							</td>
							<td class="cart_price">
								<p>${value.price}</p>
							</td>
							<td class="cart_quantity">
								<div class="cart_quantity_button">
									<a class="cart_quantity_up" onClick={handleUp} id={value.id}> + </a>
									<input class="cart_quantity_input" type="text" name="quantity" value={value.qty} autocomplete="off" size="2"/>
									<a class="cart_quantity_down" onClick={handleDown} id={value.id}> - </a>
								</div>
							</td>
							<td class="cart_total">
								<p class="cart_total_price">{total}</p>
							</td>
							<td class="cart_delete">
								<a class="cart_quantity_delete" onClick={handleRemove} ><i class="fa fa-times" id={value.id}></i></a>
							</td>
						</tr>
				)
			})
		}
	}
	function handleUp(e){
		let id = e.target.id
		let totalQty = 0
		if(id){
			// copy ra mang moi 
			let newData= [...getDataCart]
			newData.map((value,key)=>{
				if( id == value.id){
					newData[key].qty += 1 ;	
				}
				const check = JSON.parse(localStorage.getItem("DataCart"))
				if(check){
					if(Object.keys(check).length > 0){
						Object.keys(check).map((item,key)=>{
							if(id == item){
								check[item] = newData[key].qty
							}
						})
						localStorage.setItem('DataCart', JSON.stringify(check));
					}
					
				}
			})
			setDataCart(newData)

			getDataCart.map((value,key)=>{
				totalQty += value.qty
				console.log(totalQty)
			})
			
		}
		
		
	}
	
	function handleDown(e){
		let id = e.target.id
		if(id){
			let newData= [...getDataCart]
			newData.map((value,key)=>{
				if( id == value.id){
					newData[key].qty -=  1 ;
				}
				const check = JSON.parse(localStorage.getItem("DataCart"))
				if(check){
					if(Object.keys(check).length > 0){
						Object.keys(check).map((item,key)=>{
							if(id == item){
								check[item] = newData[key].qty
							}
						})
						localStorage.setItem('DataCart', JSON.stringify(check));
					}
					
				}
			})
			setDataCart(newData)
		}
	}	
	function handleRemove(e){
		let id = e.target.id
		if(id){
			let newData= [...getDataCart]
			newData.map((value,key)=>{
				if(id == value.id){
					delete newData[key]
				}
				
			})
			const a = newData.filter((a) => a);
			setDataCart(a)

			const check = JSON.parse(localStorage.getItem("DataCart"))
				if(check){
					if(Object.keys(check).length > 0){
						Object.keys(check).map((item,key)=>{
							if(id == item){
								delete check[id]
							}
							console.log(check)
						})
						localStorage.setItem('DataCart', JSON.stringify(check));
					}
					
				}
		}
	}
	function renderSum(){
		let sum = 0
		if(getDataCart.length > 0){     
		
            getDataCart.map((value,key)=>{ 
			   	let total = value.price * value.qty
				sum += total;
				
			})
		}
		return(
			<span>{sum}</span>
		)	
	}

    return(
        <div class="container">
			<div class="breadcrumbs">
				<ol class="breadcrumb">
				  <li><a href="#">Home</a></li>
				  <li class="active">Shopping Cart</li>
				</ol>
			</div>
			<div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">
							<td class="image">Item</td>
							<td class="description"></td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{renderDataCart()}
					</tbody>
				</table>
			</div>

			<div class="container">
			<div class="heading">
				<h3>What would you like to do next?</h3>
				<p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="chose_area">
						<ul class="user_option">
							<li>
								<input type="checkbox"/>
								<label>Use Coupon Code</label>
							</li>
							<li>
								<input type="checkbox"/>
								<label>Use Gift Voucher</label>
							</li>
							<li>
								<input type="checkbox"/>
								<label>Estimate Shipping & Taxes</label>
							</li>
						</ul>
						<ul class="user_info">
							<li class="single_field">
								<label>Country:</label>
								<select>
									<option>United States</option>
									<option>Bangladesh</option>
									<option>UK</option>
									<option>India</option>
									<option>Pakistan</option>
									<option>Ucrane</option>
									<option>Canada</option>
									<option>Dubai</option>
								</select>
								
							</li>
							<li class="single_field">
								<label>Region / State:</label>
								<select>
									<option>Select</option>
									<option>Dhaka</option>
									<option>London</option>
									<option>Dillih</option>
									<option>Lahore</option>
									<option>Alaska</option>
									<option>Canada</option>
									<option>Dubai</option>
								</select>
							
							</li>
							<li class="single_field zip-field">
								<label>Zip Code:</label>
								<input type="text"/>
							</li>
						</ul>
						<a class="btn btn-default update" href="">Get Quotes</a>
						<a class="btn btn-default check_out" href="">Continue</a>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="total_area">
						<ul>
							<li>Cart Sub Total <span>$59</span></li>
							<li>Eco Tax <span>$2</span></li>
							<li>Shipping Cost <span>Free</span></li>
							<li>Total{renderSum()}</li>
						</ul>
							<a class="btn btn-default update">Update</a>
							<a class="btn btn-default check_out" href="">Check Out</a>
					</div>
				</div>
			</div>
		</div>
		</div>
    )
}
export default Cart
