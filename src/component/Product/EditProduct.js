import axios from "axios";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error"

function EditProduct(props){
  const[brand, setBrand] = useState([]);
  const[category, setCategory] = useState([]);
  const[inputs,setInputs] = useState({
    name:"",
    price:"",
    detail:"",
    category:"",
    brand: "",
    status: "",
    company:"",
    sale:"",
    image:""
  })
  const [errors,setErrors] = useState({});
  const [avatar,setAvatar] = useState([]);
  const [avatarCheckbox,setAvatarCheckbox] = useState([]);  
  let params = useParams();
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
        axios.get("http://localhost/laravel/laravel/public/api/user/product/" + params.id, config)
        .then(res=>{
            setInputs(res.data.data)
        })    
    }
    },[])
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
        <input type="sale"  name="sale" placeholder="0%"/>
      )
    }
  }

  function renderAvatar(){
    if(Object.keys(inputs.image).length > 0){
      let img = inputs.image;
      return Object.keys(img).map((item,key)=>{
          return(
            <div>  
                <input type="checkbox" name="avatarCheckbox" value={img[item]}  onClick={handleCheck}/>
                <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + inputs.id_user +"/" + img[item]} width="100" height="100"/>
            </div>
          )
        }) 
    } 
  }
  console.log(inputs)
  function handleCheck(e){
    const value = e.target.value
    const checked = e.target.checked  
    if(checked == true){
      avatarCheckbox.push(value)
    }
    else{
      let index = avatarCheckbox.indexOf(e.target.value) ;
      if(index > -1)
      avatarCheckbox.splice(index,1);   
    }
  }
  const handleInput = (e) =>{
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs(state => ({...state,[nameInput]:value}))
  }
  console.log(inputs)
  function handleFile(e){
    setAvatar(e.target.files)
  }

  const handleSubmit = (e)=> {
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
    if(inputs.image == undefined){
      flag = false;
      xx = 2
      errorSubmit.file = "vui long nhap image"
    }
    else{
      if(avatar[0].size > 1024*1024){
        flag = false;
        xx = 2;
        errorSubmit.file = "dung luong qua lon"
      }
      if(avatar.length + (inputs.image.length - avatarCheckbox.length) > 3 ){
        
        flag = false;
        xx = 2;
        errorSubmit.file = "File qua nhieu"
      }
    }
    if(!flag){
      setErrors(errorSubmit);
    }
    if(xx == 1 ){
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
          console.log(inputs)
          const formData = new FormData();
          formData.append('name', inputs.name);
          formData.append('price', inputs.price);
          formData.append('category', inputs.category);
          formData.append('brand', inputs.brand);
          formData.append('company', inputs.company);
          formData.append('detail', inputs.detail);
          formData.append('status', inputs.status);
          formData.append('sale', inputs.sale);
          formData.append('id_category', inputs.category);
          formData.append('id_brand', inputs.brand);
          formData.append('company_profile', inputs.company);
          

          Object.keys(avatar).map((item,i)=>{
            formData.append("file[]",avatar[item]);
          });
          Object.keys(avatarCheckbox).map((item,i)=>{
            formData.append("avatarCheckBox[]",avatarCheckbox[item]);
          });

          axios.post('http://localhost/laravel/laravel/public/api/user/edit-product/' + params.id, formData,config) 
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
              <input type="text" placeholder="Name" name="name" defaultValue={inputs.name} onChange={handleInput}/>
              <input type="price" placeholder="Price" name="price" defaultValue={inputs.price} onChange={handleInput}/>
              <select name="category" onChange={handleInput}>{renderCategory()}</select>
              <select name="brand" onChange={handleInput}>{renderBrand()}</select>
              <select name="status" onChange={handleInput} >
                  <option value={0}>New</option>
                  <option value={1}>Sale</option>
              </select>
              {renderSale()}
              <input type="Company" placeholder="Company profile" name="company"  defaultValue={inputs.company_profile} onChange={handleInput}/>
              <input type="file" name="file" accept=".jpg, .png, .jpqeg, .PNG, .JPG" onChange={handleFile} multiple/>
              {renderAvatar()}
              <textarea name="detail" placeholder="Detail" rows="11" defaultValue={inputs.detail} onChange={handleInput}></textarea>
              <button>Submit</button>    
            </form>
          </div>
        </div>
    )
}
export default EditProduct