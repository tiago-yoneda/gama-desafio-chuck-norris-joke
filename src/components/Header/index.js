import {
  Menu
}  from '@chakra-ui/react'
import Logo from '../../assets/logo.jpeg';


const Header = () => {
  return(
    <nav>
      <img src={Logo} className="logo" alt="Logo" />
      <Menu></Menu>
    </nav>
  )
}

export default Header;