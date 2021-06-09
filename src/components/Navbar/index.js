import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElemets';

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = ()=> {
      if(window.scrollY >= 80) {
          setScrollNav(true)
      } else {
          setScrollNav(false)
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', changeNav)
  }, []);

  const toogleHome = () => {
      scroll.scrollToTop()
  };


    return (
     <>
     <IconContext.Provider value={{ color: '#fff'}}>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to='/' onClick={toogleHome}>Eco-Sol</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Nosotros</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="discover" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Permisos</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="services" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Servicios</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="Contactanos" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Contactanos</NavLinks>
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">Pedido</NavBtnLink>
                </NavBtn>
            </NavbarContainer>
        </Nav>
     </IconContext.Provider>
     </>
    );
};

export default Navbar;
