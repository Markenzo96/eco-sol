import React, {useState} from 'react';
import Video from '../../videos/Pexels Videos 2480792.mp4';
import { Button } from '../ButtonElemets';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight, HeroP2} from './HeroElemets';

const HeroSection = () => {
    const [hover, setHover] =useState(false)

    const onHover = () => {
        setHover(!hover)
    }
    
    
    return (
        <HeroContainer id='home'>
           <HeroBg>
               <VideoBg autoPlay loop muted src={Video} type='video/ mp4' />
           </HeroBg> 
           <HeroContent>
               <HeroH1>ECO-SOL. SOLUCIONES INTEGRALES.</HeroH1>
               <HeroP>
                   Empresa Totalmente Dedicada A La Recoleccion De Residuos Peligrosos Y Aceite Quemado.
               </HeroP>
               <HeroP2>Por un mundo sin Contamininacion, Por un Mundo Mejor.</HeroP2>
               <HeroBtnWrapper>
                  <Button to='Contactanos' onMauseEnter={onHover} onMouseLeave={onHover}
                  primary='true'
                  dark='true'
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact='true'
                  offset={-80}
                  >
                   Contactanos {hover ? <ArrowForward /> : <ArrowRight />}   
                  </Button> 
               </HeroBtnWrapper>
           </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection;
