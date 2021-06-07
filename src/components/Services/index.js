import React from 'react'
import Icon1 from '../../images/tanque-limpiapiezas-75-litros-vista1.png'
import Icon2 from '../../images/camion.jpg'
import Icon3 from '../../images/unnamed.jpg'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElemets'; 



const Services= () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Servicios Que Ofrecemos</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2> Maquina Limpia Partes</ServicesH2>
                    <ServicesP>Facilita el labado de piezas mediante un desengrasante. Siendo mas comodo para el cliente y ahorrando tiempo.</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2> Recoleccón de Aceite Quemado</ServicesH2>
                    <ServicesP>Se recolecta el aceite quemado,se hace limpieza del area y  se entregan manifiestos debidamente con las autorizaciones .</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2> Recolección de Residuos Peligrosos </ServicesH2>
                    <ServicesP>Se recolecta cualquier tipo de residuos peligros, dando un destino final a estos y ampalandolo con un maniefiesto .</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
