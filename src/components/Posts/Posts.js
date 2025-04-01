import { useState, useEffect } from 'react';
import Loading from '../Loading';
import Error from '../Error';
import Card from '@mui/material/Card';
import { Button, Alert } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';



export default function Posts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [delSuccess, setDelSuccess] = useState(null)
  const [showDelText, setShowDelText] = useState(false)

  const deletePost = async(postId) =>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {method: 'DELETE'})
    if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      if(res.ok){
        setDelSuccess('Deletion is successful')
        setShowDelText(true)
      }
    const updatedPosts = data.filter((post) => post.id !== postId);
    setData(updatedPosts);
    setTimeout(() => {
        setDelSuccess(null)
        setShowDelText(false)
    }, 2000)
  } 


  if (loading) {
    return <Loading />;
  }

  if (error || data == null || data.length === 0) {
    return <Error />;
  }

  // Get the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / postsPerPage);

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(showDelText)

  return (
    <>
    <div style={{marginRight:'20px', marginLeft:'20px'}}>
    <div style={{display:'flex', flexWrap:'wrap', gap:'6px'}}>
    
    
    {currentPosts.map((post) => (
        <div key={post.id} style={{paddingLeft:'8px', paddingRight:'8px', width: 'calc(33.333%) - 6px',}}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {post.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant='outlined' onClick={() => deletePost(post.id)}>Delete</Button>
            </CardActions>
          </Card>
          {showDelText ? (
          <Alert key={post.id} severity="success">{delSuccess}</Alert>
        ) : (
          null
        )}
          
        </div>
      
      ))}
      

    </div>
      
      <div style={{display:"flex", justifyContent:'center', marginTop:'1rem', marginBottom:'1rem'}}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{paddingLeft:'2px', paddingRight:"2px"}}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
    </>
  );
}
