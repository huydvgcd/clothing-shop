import { useState } from "react"
import axios from "axios";
import Error from "../Error/Error";
import { useNavigate } from 'react-router-dom';

function Login(props){
	const [inputs,setInputs] = useState ({
        email: "",
        password:""   
    });
	const [errors,setErrors] = useState({});
    
    const handleInput = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
	const navigate = useNavigate();
	console.log(inputs)
	const handleSubmit = (e)=>{
        e.preventDefault();
        
        let errorSubmit ={}
        let flag = true;
        let xx =1;
        
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
		if(!flag){
			setErrors(errorSubmit);
		}
		if(xx == 1){
			setErrors({})
			const data = {
			  email: inputs.email,
			  password: inputs.password,
			  level: 0,
		}
		axios.post("http://localhost/laravel/laravel/public/api/login", data)
		.then((res)=>{
			console.log(res)
			if(res.data.errors){
			setErrors(res.data.errors)
			}
			else{
				localStorage.setItem('Information', JSON.stringify(res.data))
				localStorage.setItem('true', JSON.stringify(true));
				navigate('/');
			}		  	
		})
        }
        
    }
    return(
        <div class="col-sm-4 col-sm-offset-1">
			<div class="login-form">
				<h2>Login to your account</h2>
				<Error errors={errors}/>
				<form action="#" onSubmit={handleSubmit}>
					<input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
					<span>
						<input type="checkbox" class="checkbox"/> 
						Keep me signed in
					</span>
					<button type="submit" class="btn btn-default">Login</button>
				</form>
			</div>
		</div>
    )
}
export default Login