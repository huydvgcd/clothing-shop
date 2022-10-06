import axios, { Axios } from "axios";
import { useState } from "react"
import Error from "../Error/Error"
function Register(){
    const [inputs,setInputs] = useState({
      email: "",
      password:"",   
      name:"",
      address:"",
      phone:""
    });
    const [errors,setErrors] = useState({});
    const [file,setFile] = useState();
    const [avatar,setAvatar] = useState();
    function handleFile(e){
      setFile(e.target.files)
      let reader = new FileReader();
      reader.onload = (e) =>{
        setAvatar(e.target.reasult);
        setFile(file[0]);
      };
      reader.readAsDataURL(file[0])
  }
  // console.log(file)
    const handleInput = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
    const handleSubmit = (e)=>{
      e.preventDefault();

      let errorSubmit ={}
      let flag = true;
      let xx = 1;
      if(inputs.email == ""){
        flag = false;
        xx = 2
        errorSubmit.email = "Vui long nhap email";
      }
      if(inputs.password == ""){
        flag = false; 
        xx = 2
        errorSubmit.password = "Vui long nhap pass";
      }
      if(inputs.phone == ""){
        flag = false;
        xx = 2
        errorSubmit.phone = "Vui long nhap phone";
      }
      if(inputs.address == ""){
        flag = false;
        xx = 2
        errorSubmit.address = "Vui long nhap address";
      }
      if(inputs.name == ""){
        flag = false;
        xx = 2
        errorSubmit.name = "Vui long nhap name";
      }
      if(file == undefined){
        flag = false;
        xx = 2
        errorSubmit.file = "vui long nhap image"
      }
      else{
        if(file[0].size > 1024*1024){
            alert("fail")
        }
        else{
            alert("oke")
        }
    }
      if(!flag){
        setErrors(errorSubmit);
      }
      if(xx == 1){
        setErrors({})
        const data = {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          address: inputs.address,
          phone: inputs.phone,
          level: 0,
          avatar: avatar
        }
        axios.post("http://localhost/laravel/laravel/public/api/register", data)
        .then((res)=>{
          if(res.data.errors){
            setErrors(res.data.errors)
            console.log(res)
          }
          else{
            alert("oke")
          }
          console.log(res)
        })
      }
      
  }
    return(
      <div class="col-sm-4">
          <div class="signup-form"> 
            <Error errors={errors}/>
            <h2>New User Signup!</h2>
            <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
              <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
              <input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
              <input type="password" placeholder="Password"  name="password" onChange={handleInput}/>
              <input type="phone" placeholder="Phone" name="phone"  onChange={handleInput}/>
              <input type="address" placeholder="Address" name="address" onChange={handleInput}/>
              <input type="level" placeholder="Level" name="level"  value={0}/>
              <input type="file" name="file" accept=".jpg, .png, .jpqeg, .PNG, .JPG" onChange={handleFile}/>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
      </div>
    )
}
export default Register