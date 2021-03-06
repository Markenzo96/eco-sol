import React from 'react'
import Icon1 from '../../images/tanque-limpiapiezas-75-litros-vista1.png'
import Icon2 from '../../images/camion.jpg'
import Icon3 from '../../images/unnamed.jpg'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElemets'; 



const Services= () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Servicios que ofrecemos</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2><strong>Máquina limpia partes</strong></ServicesH2>
                    <ServicesP>Facilita el lavado de piezas mediante un desengrasante. Siendo más cómodo para el cliente y ahorrando tiempo.</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2 className="text-center mt-2"><strong>Recolección de aceite quemado</strong></ServicesH2>
                    <ServicesP>Se recolecta el aceite quemado, se hace limpieza del área y se entregan manifiestos con las autoridades.</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2 className="text-center mt-2"><strong>Recolección de residuos peligrosos</strong></ServicesH2>
                    <ServicesP>Se recolecta cualquier tipo de residuo peligroso, dando un destino final a este y amparandolo con un manifiesto.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
