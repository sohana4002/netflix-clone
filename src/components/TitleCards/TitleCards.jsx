import React, { useRef, useEffect, useMemo, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

const TitleCards = ({title, category}) => {

  const [apiData, setApiData]=useState([]);
  const cardsRef=useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWYwNWFiYWM5NWFmNjM3OTkwZDMxOGViM2YxOWEzZCIsIm5iZiI6MTc0NzY1MTU1OC4zMTUsInN1YiI6IjY4MmIwYmU2MTVhMDFkNWE0NGUyNGQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xLJBj_o1krwyH54gW61X6T7zznniKXAnzGbf4mAHsbc'
  }
};

  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft+=event.deltaY;
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  },[]);

  const shuffledCards = useMemo(() => shuffleArray(cards_data), []);


  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
          return (
            <Link to={`/player/${card.id}`} className='card' key={index}>
              <div className='card-image-container'>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=''/>
                <div className='overlay'>
                  <p>▶ Play</p>
                </div>
              </div>
              <p>{card.original_title}</p>
            </Link>
          );
          })}
      </div>
    </div>
  )
}

export default TitleCards
