/* import { CircularProgress } from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';

export default function DiagnosticsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10;

  useEffect(() => {
    const fetchData = async() => {
        try{
            const res = await fetch('/api/diagnostics')
            if(!res.ok) {
                throw new Error("Error happened while fetching the api")
            }
            const response = await res.json();
            setData(response)
            
        } catch(e){
            setError(e)
            console.log("An error happened while fetching the data", e)
        } finally{
            setLoading(false)
        }
    }
    fetchData()

  }, [])



const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
const totalPages = Math.ceil(data.length / postsPerPage)


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

  

  const filteredData = useMemo(() => {
    return currentPosts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [currentPosts, filter]);

  const handleOnChange = (e) => {
    setFilter(e.target.value);
  }

  
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if(loading){
    return (
        <>
            <p>{error.message || 'Something went wrong'}</p>
            <CircularProgress/>
        </>
)
  }

  if(error){
    return <p>{error.message || 'Something went wrong'}</p>
  }

  return (
    <>
      <h2>Diagnostics</h2>
      <label htmlFor="searchInput">Search by name</label>
      <input
        type="text"
        value={filter}
        onChange={(e) => handleOnChange(e)}
        placeholder="Search by name"
        
      />

        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {filteredData.map((item) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.status}</td>
            </tr>
            ))}
        </tbody>
        </table>

      {filteredData.length === 0 &&
            <p>No mathcing results found</p>
        }

        <button onClick={prevPage} disabled={currentPage === 1}> Previous </button>
        <span style={{paddingLeft:'2px', paddingRight:"2px"}}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
    </>
  );
}

 */


/* function Dashboard({ diagnostics }) {
    const [search, setSearch] = useState('');

    const refinedFilteredDiagnostics = useMemo(() => {
        const filteredDiagnostics = diagnostics.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
        return filteredDiagnostics
    }, [search])
  
    return (
      <>
      <label htmlFor="searchString"></label>
        <input
          id="searchString"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vehicle"
        />
        <ul>
          {refinedFilteredDiagnostics.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </>
    );
  } */



    function VehicleCard({ name, status, buttonLabel, onClick }) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2>Vehicle Card</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Status:</strong> {status}</p>
            {buttonLabel && onClick && (
              <button onClick={onClick}>{buttonLabel}</button>
            )}
          </div>
        );
      }
      
  

    export default VehicleCard;