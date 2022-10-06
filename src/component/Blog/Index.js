import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
function Blog() {
      const[getItem,setItem] = useState([]);
      useEffect(()=>{
            axios.get("http://localhost/laravel/laravel/public/api/blog")
            .then(res=>{

                  setItem(res.data.blog)  

                  
            })
            .catch(error => console.log(error))
      },[])
      console.log(getItem)
      function renderItem(){
            if(Object.keys(getItem).length > 0){      
                  return getItem.data.map((value,key)=>{
                        return(
                              <div className="single-blog-post">
                                    <h3>{value.title}</h3>
                                    <div class="post-meta">
							<ul>
								<li><i class="fa fa-user"></i> Mac Doe</li>
								<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
								<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
							</ul>
							<span>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star-half-o"></i>
							</span>
                                          <a>
                                                <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/"+value.image}/>
                                          </a>
                                          <p>{value.description}</p>
                                          <Link class="btn btn-primary" to={"/blog/detail/"+ value.id}>Read More</Link>
						</div>
                              </div>
                              
                        )
                  })
            }
      }
      return(
            <div className="col-sm-9">
                  <div className="blog-post-area">
                        <h2 className="title text-center">LATEST FROM OUR BLOG</h2>
                        {renderItem()}
                  </div>       
            </div>
            
      )
}
    
export default Blog;