import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}=useParams();
  const navigate=useNavigate();

  const [apiData, setApiData]=useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWYwNWFiYWM5NWFmNjM3OTkwZDMxOGViM2YxOWEzZCIsIm5iZiI6MTc0NzY1MTU1OC4zMTUsInN1YiI6IjY4MmIwYmU2MTVhMDFkNWE0NGUyNGQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xLJBj_o1krwyH54gW61X6T7zznniKXAnzGbf4mAHsbc'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
      const trailer = res.results.find(video => video.type === "Trailer" && video.site === "YouTube");
      if (trailer) {
        setApiData(trailer);
      } else if (res.results.length > 0) {
        setApiData(res.results[0]); // fallback if no trailer found
      } else {
        setApiData({
          name: "No trailer available",
          key: "",
          published_at: "",
          typeof: ""
        });
      }
    })
  .catch(err => console.error(err));
},[id])





  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player
