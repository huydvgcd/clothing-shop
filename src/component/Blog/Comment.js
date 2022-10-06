import axios from "axios"
import { useEffect, useState } from "react"
import Error from "../Error/Error"
import{useParams,useLocation,useNavigate} from "react-router-dom"

function Comment(props){
    const [comment,setComment] = useState("");
    const [errors,setErrors] = useState({});
    const [getItem,setItem] = useState([]);
    const getIdrep = props.getIdrep
    console.log(getIdrep)

    const handleInput = (e)=>{
        setComment(e.target.value)
    }
    const params = useParams();
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        let errorSubmit ={}
        let flag = true;
        var check = localStorage.getItem('true')
        console.log(check)
        if(check){  
            const userData = JSON.parse(localStorage.getItem("Information"));
            setErrors({})
            let url = 'http://localhost/laravel/laravel/public/api/blog/comment/' + params.id
            let accessToken = userData.success.token
            let config = {
                headers:{
                'Authorization':'Bearer ' + accessToken,
                'Content-Type' : 'application/x-ww-form-urlencoded',
                'Accept' :  'application/json'
                }
            };
            const formData = new FormData();
                formData.append('id_blog', params.id);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', getIdrep ? getIdrep : 0);
                formData.append('comment', comment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);
            axios.post(url, formData, config, getIdrep)
            .then(res=>{
                if(res.data.errors){
                    setErrors(res.data.errors)
                }
                else{
                    props.getCMT(res.data.data)  
                    console.log(res)      
                }
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
    return(
    
                    <div class="replay-box">
						<div class="row">
							<div class="col-sm-12">
								<h2>Leave a replay</h2>
								
								<div class="text-area">
									<div class="blank-arrow">
										<label>Your Name</label>
									</div>
									<span>*</span>
                                    <Error errors={errors}/>
                                    <form  onSubmit={handleSubmit}>
                                        <textarea name="comment" rows="11" onChange={handleInput}></textarea>
									    <button class="btn btn-primary">post comment</button>
                                    </form>
									
								</div>
							</div>
						</div>
					</div>
    )
}
export default Comment