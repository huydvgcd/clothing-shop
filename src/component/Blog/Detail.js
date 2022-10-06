import axios from "axios";
import {useEffect, useState } from "react";
import{useParams} from "react-router-dom"
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail(props){
    let params = useParams();

    const[data,setData] = useState('');
    const[newData,setNewData] = useState('');
    const[oldData, setOldData] = useState('');
    const [getIdrep,setIdrep] = useState('');
    // const [getRating,setRating] = useState('');

    // console.log(getIdrep)
    useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/blog/detail/"+params.id)
        .then(res=>{
            // console.log(res.data.data.comment)
            setData(res.data.data) 
            setOldData(res.data.data.comment)
        })
        .catch(error => console.log(error))
    },[])
   
    function getCMT(x){
        setNewData(x)
    }
    // console.log(newData)
    const listComment = oldData.concat(newData)
    // console.log(listComment) 
    
    return(
        <div className="col-sm-9">
                    <div className="blog-post-area">
                        <h2 className="title text-center">LATEST FROM OUR BLOG</h2>
                        <div className="single-blog-post">
                                    <h3>{data.title}</h3>
                                    <div class="post-meta">
							<ul>
								<li><i class="fa fa-user"></i> Mac Doe</li>
								<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
								<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
							</ul>
							
                                          <a>
                                                <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + data.image}/>
                                          </a>
                                          <p>{data.description}</p>
						</div>
                              </div>
                    </div>
                    <Rate/>
                    <div class="response-area">
						<h2>3 RESPONSES</h2>
                        <ListComment listComment ={listComment} setIdrep={setIdrep}/>
                    </div>
                    <Comment getCMT={getCMT} getIdrep={getIdrep}/>      
                        
                     
            </div>
    )
}
export default Detail