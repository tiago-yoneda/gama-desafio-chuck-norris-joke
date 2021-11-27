import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Grid,
  GridItem,
  Container,
  Center
}  from '@chakra-ui/react'
import Logo from '../../assets/logo.jpeg';

import api from '../../services/api'


const Header = () => {
  const [main, setMain] = useState([])
  useEffect(() => {
    api.get('categories').then(
      res => {
        setMain(res.data)
      }
    )
  }, [])
  return(
    <nav>
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(5, 1fr)" gap={10}>
          <GridItem colEnd={3}>
            <Link to='/'>
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
          </GridItem>
          <GridItem colStart={6} colEnd={12} h="150px">
            <Menu>
              {main?.map( item => (
                <>
                  <Center>
                    <Link to='/bla'>
                      <h5>{item}</h5>
                    </Link>
                  </Center>
                </>
              ))}
            </Menu>
          </GridItem>
        </Grid>
      </Container>
    </nav>
  )
}

export default Header;