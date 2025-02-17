import React, {useEffect, useState} from 'react';

import {
  FormLabel,
  Input,
  Button,
  Box
} from '@chakra-ui/react'

import api from '../../services/api';

import Loader from '../../assets/loading.gif'

const App = () => {
  const [data, setData] = useState({});
  const [allJokes, setAllJokes] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [searchJoke, setSearchJoke] = useState('');

  useEffect(() => {
    setIsLoad(true)
    api.get('random').then(
      response => {
        setData(response.data)
      }
    )
    .catch( e => console.error(e))
    .finally( () => setTimeout(() => {
      setIsLoad(false)
    }, 920))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true)
    api.get(`search?query=${searchJoke}`).then(
      res => {
        setIsSearch(true)
        setAllJokes(res.data)
      }
    )
    .catch( err => console.error(err))
    .finally( () => setIsLoad(false))
  }

  const getJoke = async () => {
    const data = await api.get('random')
      .then((response) => response.data)

    if (data) {
      setData(data)
    }
  }

  if(isLoad) {
    return(
      <div className="loader">
        <img src={Loader} alt="Loader" />
      </div>
    )
  }

  return(
    <div className="home-component">
      <h1>Joke</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <FormLabel>Pesquise sua piada:</FormLabel>
          <Input
            placeholder="o termo tem que estar em inglês"
            focusBorderColor='cyan.400'
            type="text" onChange={e => setSearchJoke(e.target.value)}
          />
          <Button className='form-button' type="submit" colorScheme='teal' size='xs'>Pesquisar</Button>
          <Button className='form-button' type="button" colorScheme='teal' size='xs' onClick={ getJoke }>Mais Uma</Button>
        </form>
      </div>
      { !isSearch ? (
        <Box
          className='jokes'
          boxShadow='dark-lg'
          my='15px'
          borderWidth='2px'
          borderRadius='md'
        >
          <img src={data?.icon_url} alt={data?.value} />
          <h3>{data?.value}</h3>
        </Box>
      ) : (
        <>
          { allJokes?.result.map( (item, index) => (
            <Box
              className='jokes'
              boxShadow='dark-lg'
              my='15px'
              borderWidth='2px'
              borderRadius='md'
              key={index}
            >
              <img src={item?.icon_url} alt={item?.value} />
              <h3>{item?.value}</h3>
            </Box>
          ))}
        </>
      )}
    </div>
  )
}

export default App