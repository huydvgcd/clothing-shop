import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import EditProduct from './EditProduct';
function MyProduct(){
    const [data,setData] = useState({}) 
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
        axios.get("http://localhost/laravel/laravel/public/api/user/my-product", config)
        .then(res=>{
            setData(res.data.data)
        })    
    }
    },[])

    function renderData(){
        if(Object.keys(data).length > 0){
            
            return Object.keys(data).map((item,key)=>{
                const avatar = JSON.parse(data[item].image)
                console.log(avatar)
                return(
                    <tr>
                        <td class="cart_id">
                            <a>{data[item].id}</a>
                        </td>
                        <td class="cart_nameuser">
                            <a>{data[item].name}</a>
                        </td>
                        <td class="cart_image">
                            <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + data[item].id_user +"/" + avatar[0]} width="100" height="100"/>
                        </td>
                        <td class="cart_price">
                            <a>{data[item].price}</a>
                        </td>
                        <td class="cart_Action">
                            <a class="cart_quantity_edit"><Link to={"/Account/EditProduct/" + data[item].id} class="fas fa-edit"></Link></a>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete"  onClick={Delete}><i class="fa fa-times" id={data[item].id}></i></a>
                        </td>
                    </tr>
                )
            })
        }
    }
    function Delete(e){
        let url = 'http://localhost/laravel/laravel/public/api/user/delete-product/' + e.target.id  
        console.log(url)
        const userData = JSON.parse(localStorage.getItem("Information"));
        let accessToken = userData.success.token
        let config = {
            headers:{                                                                       
            'Authorization':'Bearer ' + accessToken,
            'Content-Type' : 'application/x-ww-form-urlencoded',
            'Accept' :  'application/json'
            }
        };
        axios.get(url, config , e.target.id) 
        .then(res=>{
            setData(res.data.data)
        });
    }
    
    
    return(
        <div class="col-sm-9">
            <div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">
							<td class="Id">Id</td>
							<td class="Name">Name</td>
							<td class="Image">Image</td>
							<td class="Price">Price</td>
							<td class="Action">Action</td>
							<td></td>
						</tr>
					</thead>
                    <tbody>
                        {renderData()}
                    </tbody>	
				</table>
			</div>
            <button><Link to="/Account/AddProduct" class="fa fa-user">ADD PRODUCT</Link></button>
        </div>
        
        
    )
}
export default MyProduct