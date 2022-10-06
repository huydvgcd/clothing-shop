import axios from "axios";
import {useEffect, useState } from "react";
import Error from "../Error/Error"
function AddProduct(){
    const[brand, setBrand] = useState([])
    const[category, setCategory] = useState([])
    const[inputs,setInputs] = useState({
        name:"",
        price:"",
        detail:"",
        category:"1",
        brand: "1",
        status: "0",
        company:"",
        sale:"0",
    }) 
    const [errors,setErrors] = useState({});
    const [avatar,setAvatar] = useState();

    function handleFile(e){
        setAvatar(e.target.files)
    }
    console.log(inputs)
    useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
        .then(res=>{
            setBrand(res.data.brand)
            setCategory(res.data.category)
        })
        .catch(error => console.log(error))
    },[])
    function renderCategory(){
        return category.map((value,key)=>{
            return(
                <option value={value.id}>{value.category}</option>
            ) 
        })
    }
    function renderBrand(){
        return brand.map((value,key)=>{
            return(
                <option value={value.id}>{value.brand}</option>
            ) 
        })
    }
    function renderSale(){
      if(inputs.status == 1){
        return(
        <input type="sale"  name="sale" placeholder="0%" onChange={handleInput}/>
        )
      }
      
    }
    const handleInput = (e) =>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        let errorSubmit ={}
        let flag = true;
        let xx = 1;

        if(inputs.name == ""){
          flag = false;
          xx = 2
          errorSubmit.name = "Vui long nhap name";
        }
        if(inputs.price == ""){
          flag = false; 
          xx = 2
          errorSubmit.price = "Vui long nhap price";
        }
        if(inputs.detail == ""){
          flag = false;
          xx = 2
          errorSubmit.detail = "Vui long nhap detail";
        }
        if(inputs.brand == ""){
          flag = false;
          xx = 2
          errorSubmit.brand = "Vui long chon brand";
        }
        if(inputs.category == ""){
          flag = false;
          xx = 2
          errorSubmit.category = "Vui long chon category";
        }
        
        if(inputs.company == ""){
            flag = false;
            xx = 2
            errorSubmit.company = "Vui long nhap company";
          }
        if(avatar == undefined){
          flag = false;
          xx = 2
          errorSubmit.file = "vui long nhap image"
        }
        else{
          if(avatar[0].size > 1024*1024){
              errorSubmit.file = "dung luong qua lon"
          }
        }
        if(!flag){
          setErrors(errorSubmit);
        }
        if(xx == 1){
          setErrors({})
          const userData = JSON.parse(localStorage.getItem("Information"));
          let accessToken = userData.success.token
          let config = {
                headers:{                                                                       
                'Authorization':'Bearer ' + accessToken,
                'Content-Type' : 'application/x-ww-form-urlencoded',
                'Accept' :  'application/json'
                }
          };
          const formData = new FormData();
          formData.append('name', inputs.name);
          formData.append('price', inputs.price);
          formData.append('category', inputs.category);
          formData.append('brand', inputs.brand);
          formData.append('company', inputs.company);
          formData.append('detail', inputs.detail);
          formData.append('status', inputs.status);
          formData.append('sale', inputs.sale);

          Object.keys(avatar).map((item,i)=>{
            formData.append("file[]",avatar[item]);
          });

          axios.post('http://localhost/laravel/laravel/public/api/user/add-product', formData,config) 
            .then(res=>{
                console.log(res)
            });

        }
    }
    return(
        <div class="col-sm-9">
          <div class="signup-form" > 
            <Error errors={errors}/>
            <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
            <input type="price" placeholder="Price" name="price" onChange={handleInput}/>
            <select name="category" onChange={handleInput} value={inputs.category}>{renderCategory()}</select>
            <select name="brand" onChange={handleInput} value={inputs.brand}>{renderBrand()}</select>
            <select name="status" value={inputs.status} onChange={handleInput} >
                <option value={0}>New</option>
                <option value={1}>Sale</option>
            </select>
            {renderSale()}
            <input type="Company" placeholder="Company profile" name="company" onChange={handleInput} />
            <input type="file" name="file" accept=".jpg, .png, .jpqeg, .PNG, .JPG"  onChange={handleFile} multiple/>
            <textarea name="detail" placeholder="Detail" rows="11" onChange={handleInput}></textarea>
            <button>Submit</button>    
        </form>
        </div>
      </div>
        
    )
}
export default AddProduct