import React, { useEffect, useState } from "react"
function ListComment(props){
    const listComment = props.listComment
    console.log(listComment)
    function getId(e){
        console.log(e.target.id)
        props.setIdrep(e.target.id)   
    }
    
    function renderComment(){
        if(Object.keys(listComment).length > 0){
            return listComment.map((value1,key)=>{
                if(value1.id_comment == 0){
                    return(
                        <React.Fragment key={key}>
                        <li class="media">		
                            <a class="pull-left" href="#">
                            </a>
                            <div class="media-body">
                                <ul class="sinlge-post-meta">
                                    <li><i class="fa fa-user"></i>{value1.name_user}</li>
                                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>{value1.comment}</p>
                                <a class="btn btn-primary" id={value1.id} onClick={getId}><i class="fa fa-reply"></i>Replay</a>
                            </div>
                        </li>
                        {listComment.map((value2,key)=>{
                            if(value1.id == value2.id_comment){
                                return(
                                    <li class="media second-media">
                                    <a class="pull-left" href="#">
                                    </a>
                                    <div class="media-body">
                                        <ul class="sinlge-post-meta">
                                            <li><i class="fa fa-user"></i>{value2.name_user}</li>
                                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                        </ul>
                                        <p>{value2.comment}</p>
                                        <a class="btn btn-primary" id={value2.id} onClick={getId}><i class="fa fa-reply"></i>Replay</a>
                                    </div>
                                    </li>
                                )    
                            }
                        })}</React.Fragment>
                        
                    )

                }   
                
            })
        }
    }
        
    return(
        <ul class="media-list">{renderComment()}</ul>
    )
}
export default ListComment