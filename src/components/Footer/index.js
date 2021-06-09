import React from 'react'
import {animateScroll as scroll} from 'react-scroll';
import {FaFacebook, FaYoutube} from 'react-icons/fa';
import {FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia,SocialLink, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElemets';


const Footer = () => {


  const toogleHome = () => {
    scroll.scrollToTop()

  
};

    return (
        <FooterContainer>
          <FooterWrap>
            <FooterLinksContainer>
              <FooterLinksWrapper>
                <FooterLinkItems>
                   <FooterLinkTitle>Sobre Nosotros</FooterLinkTitle> 
                      <FooterLink to="/" onClick={toogleHome}>Empresa</FooterLink>
                      <FooterLink to="/" onClick={toogleHome}>¿Quienes somos?</FooterLink>
                      <FooterLink to="/" onClick={toogleHome}>¿Por que nosotros?</FooterLink>
                      <FooterLink to="/" onClick={toogleHome}>Productos</FooterLink>
                      <FooterLink to="/signin">Solicitar pedido</FooterLink>
                </FooterLinkItems>  
                <FooterLinkItems>
                   <FooterLinkTitle>Contactanos</FooterLinkTitle> 
                      <FooterLink to="/">Oficina</FooterLink>
                      <FooterLink to="/">RH: 33-31-52-88-04.</FooterLink>
                      <FooterLink to="/">Gerente: 33-17-70-74-33.</FooterLink>
                </FooterLinkItems>  
              </FooterLinksWrapper>  
              <FooterLinksWrapper>
                <FooterLinkItems>
                   <FooterLinkTitle>Redes Sociales</FooterLinkTitle> 
                   <SocialLink href="//www.facebook.com"  >
                     Facebook
                  </SocialLink>
                  <SocialLink href="//www.Youtube.com" >
                    Youtube
                  </SocialLink>   
                      
                </FooterLinkItems>  
              </FooterLinksWrapper> 
            </FooterLinksContainer>  
            <SocialMedia>
              <SocialMediaWrap>
                <SocialLogo to='/' onClick={toogleHome}>
                  Eco-Sol
                </SocialLogo>
                <WebsiteRights> Eco-Sol: Soluciones Integrales © {new Date().getFullYear()} Todos los Derechos Reservados. </WebsiteRights>
                <SocialIcons>
                  <SocialIconLink href="//www.facebook.com" target="_blank" aria-label="Facebook">
                    <FaFacebook />
                  </SocialIconLink>
                  <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                    <FaYoutube />
                  </SocialIconLink>
                </SocialIcons>
              </SocialMediaWrap>
            </SocialMedia>
          </FooterWrap>  
        </FooterContainer>
    )
}

export default Footer;
