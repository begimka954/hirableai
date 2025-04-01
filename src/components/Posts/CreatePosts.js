import  { useState } from "react"

export default function CreatePosts() {
    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)
    return(
        <form>
            <label>
                Title
            </label>
            <input input="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            required
            ></input>
            <label>
                Body
            </label>
            <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)} // Update body state
          required
        />
        </form>
    )
}