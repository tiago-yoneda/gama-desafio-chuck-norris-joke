import { Link } from 'react-router-dom'
import {
  Menu
}  from '@chakra-ui/react'
import Logo from '../../assets/logo.jpeg';


const Header = () => {
  return(
    <nav>
      <Link to='/'>
        <img src={Logo} className="logo" alt="Logo" />
      </Link>
      <Menu>
      <Link to='/bla'>
        <h5>Bla</h5>
      </Link>
      </Menu>
    </nav>
  )
}

export default Header;