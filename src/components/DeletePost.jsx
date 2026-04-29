import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";




function DeletePost(){

const deletePost = async({id})=>{

    try {
        const token = localStorage.getItem("token");

      const result =  await axios.delete(`https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/delete/${id}`,  {
                    headers: {
                        token: `Bearer ${token}`
                    }
                }
            )
            

            console.log(result,"558899")
         
        
    } catch (error) {
        console.log(error)
    }

}



    return(
        <>
        
         <Button variant="danger" onClick={deletePost}>
                Delete
            </Button>
        
        </>
    )
}



export default DeletePost