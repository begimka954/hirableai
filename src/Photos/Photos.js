import { useState, useEffect } from "react"
import Loading from "../components/Loading"

export default function Photos(){
    const [photo, setPhoto] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchPhotos = async() =>{
            try{
                const res = await fetch("https://jsonplaceholder.typicode.com/photos")
                if(!res.ok) {
                    throw new Error("Failed to fetch photos")
                }
                const result = await res.json()
                setPhoto(result)
            }catch(error){
                setError(error.message)
                console.log("Error happened while fetching photos, here is the message", error)
            }finally{
                setLoading(false)
            }     
        }
        fetchPhotos()   
    }, [])
if(loading){
    return <Loading/>
}

    return(
       
        <div>
        {photo.map((photoItem) => (
        <div key={photoItem.id}>
          <p>{photoItem.title}</p>
          <img src={photoItem.url} alt={photoItem.title} />
        </div>
      ))}
        </div>
      
    )
}