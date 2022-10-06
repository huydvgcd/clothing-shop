import { useEffect, useState } from "react"
import Error from "../Error/Error"
import axios from "axios"
function UpdateMember(){
  const [inputs,setInputs] = useState({
      name:"",
      email:"",
      password:"",   
      phone:"",
      address:"",
      level:"",
  });
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('Information'));
    if (data) {
      setInputs(data);
      }
  },[]);
    const [errors,setErrors] = useState({});

    const handleInput = (e) =>{
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs(state => ({...state,[nameInput]:value}))
    }
    const handleSubmit = (e)=>{
      e.preventDefault(); 
        
      let errorSubmit ={}
      let flag = true;
      let xx =1;
      
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
      if(!flag){
        setErrors(errorSubmit);
      }
      if(xx == 1){
        setErrors({})
        let accessToken = inputs.success.token
        let config = {
                headers:{                                                                       
                'Authorization':'Bearer ' + accessToken,
                'Content-Type' : 'application/x-ww-form-urlencoded',
                'Accept' :  'application/json'
                }
        };
        let url = 'http://localhost/laravel/laravel/public/api/user/update/' + inputs.Auth.id 
        console.log(config)
        const formData = new FormData();
                formData.append('name', inputs.Auth.name);
                formData.append('email', inputs.Auth.email);
                formData.append('password', inputs.Auth.password);
                formData.append('phone', inputs.Auth.phone);
                formData.append('address', inputs.Auth.address);
                formData.append('level', inputs.Auth.level);
                formData.append('avatar', inputs.Auth.avatar);

        axios.post(url ,formData, config) 
        .then(res=>{
            console.log(res)
        });
      }
    }
    console.log(inputs)
    
    return(
        <div class="col-sm-4">
          <div class="signup-form"> 
            <Error errors={errors}/>
            <h2>User Update!</h2>
            <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
              <input type="text" placeholder="Name" name="name" id="myText" onChange={handleInput} defaultValue={inputs.name}/>
              <input type="email" placeholder="Email Address" name="email" onChange={handleInput} defaultValue={inputs.email} readOnly />
              <input type="password" placeholder="Password"  name="password" onChange={handleInput} value={123}/>
              <input type="phone" placeholder="Phone" name="phone"  onChange={handleInput} defaultValue={inputs.phone}/>
              <input type="address" placeholder="Address" name="address" onChange={handleInput} defaultValue={inputs.address}/>
              <input type="level" placeholder="Level" name="level"  defaultValue={inputs.level}/>
              <input type="file" name="file" accept=".jpg, .png, .jpqeg, .PNG, .JPG"  defaultValue={inputs.avatar}/>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
      </div>
    )
}
export default UpdateMember;