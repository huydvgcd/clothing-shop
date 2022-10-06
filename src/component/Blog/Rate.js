import StarRatings from "react-star-ratings"
import axios from "axios"
import { useState,useEffect } from "react"
import{useParams} from "react-router-dom"
import Error from "../Error/Error"

function Rate(){
    let params = useParams();
    const [rate, setRate] = useState('');
    const [errors,setErrors] = useState({});
    const [rated,setRated] = useState()

    function rating(value){
        setRate(value)
        console.log(value)
        let errorSubmit ={}
        let flag = true;
        var check = localStorage.getItem("true")
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
            const formData = new FormData();
                formData.append('blog_id', params.id);
                formData.append('user_id', userData.Auth.id);
                formData.append('rate', rate);
            axios.post('http://localhost/laravel/laravel/public/api/blog/rate/' + params.id, formData,config) 
            .then(res=>{
                console.log(res)
            });
        }
        else{
            errorSubmit.userData = "Vui long login";
            flag = false;
        }
        if(!flag){
			setErrors(errorSubmit);
            
		}   
    }
    useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/blog/rate/' + params.id)
        .then(res=>{
            console.log(res)
            if(res.data.data){
                var sum = 0;
                res.data.data.map((value,keys) =>{
                sum += value.rate
                 })
                const tb = sum/res.data.data.length
                setRated(tb)
            }
            
        })
        .catch(error => console.log(error))
    },[])
    
    return(
        <div class="rating-area">
                        <Error errors={errors}/>
						<ul class="ratings">
							<li class="rate-this">Rate this item:</li>
							<li>
								<StarRatings 
                                rating={rate ? rate : rated}
                                changeRating = {rating}
                                numberOfStars={5}
                                name='rating'
                                />
							</li>
							<li class="color"></li>
						</ul>
						<ul class="tag">
							<li>TAG:</li>
							<li><a class="color" href="">Pink <span>/</span></a></li>
							<li><a class="color" href="">T-Shirt <span>/</span></a></li>
							<li><a class="color" href="">Girls</a></li>
						</ul>
		</div>
    )
}
export default Rate