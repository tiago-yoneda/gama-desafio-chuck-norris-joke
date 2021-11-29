import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import Loader from '../../assets/loading.gif';

const Categories = () => {
  const [ joke, setJoke ] = useState({});
  const [ isLoad, setIsLoad ] = useState(false)
  const { category } = useParams();

  useEffect(() => {
    setIsLoad(true)
    api.get(`random?category=${category}`).then(
      res => {
        setJoke(res.data)
      }
    )
    .catch( err => console.error(err) )
    .finally( () => setTimeout(() => {
      setIsLoad(false)
    }, 920));
  }, [category])

  if(isLoad){
    return(
      <div className='loader'>
        <img src={Loader} alt="loader" />
      </div>
    )
  }

  return (
    <div className='home-component'>
      <h1>Categoria - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div>
        <img src={joke?.icon_url} alt={joke?.value}/>
        <h4>{joke?.value}</h4>
      </div>
    </div>
  )
}

export default Categories