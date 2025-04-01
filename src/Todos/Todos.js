import  { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';


export default function Todos() {

    const [todo, setTodo] = useState([]);

    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTodo = async() => {
            try{
                const res = await fetch("https://jsonplaceholder.typicode.com/todos")

                if(!res.ok){
                    console.log("an error occured")
                    setError(res.response)

                }

                const result =  await res.json()

                setTodo(result);

            } catch(e){
                console.log('Failed to fetch todo list', e)
                setError(e)
                throw new Error(e);

            } finally{
                setLoading(false)
            }
        }

        fetchTodo()
    })
    console.log(todo)

    if(loading){
        <Loading/>
    }
    if(error){
        <Error/>
    }

    

    return(
       <div> 
        <h1>Todos</h1>
        
        {todo.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
      </div>
    )
}