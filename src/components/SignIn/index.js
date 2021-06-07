import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container,  FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton,  Text} from './SigninElemets';
import SelectOptions from './SelectOptions';
import { addingDate } from "../../tools/request";


 


const Calendar = ({setUserData, userData}) => {
  const addDate = (date) => {
    setUserData({
      ...userData,
      'calendario' : date.toString()
    })
  }

  return (
    <DatePicker
      onChange={(date) => addDate(date)}
    />
  );
};

const SignIn = () => {
    const [userData, setUserData] = useState({});

    const saveData = (event) => {
      setUserData({
        ...userData,
        [event.target.name] : event.target.value
      })
    };

    

    // fetch('localhost:80/apis/getDates.php?usr=2&dt=2021-05-13').then(
    //   response => console.log(response)
    // ).catch(error => console.log(error));

    const handleSubmit = e => {
      e.preventDefault();

      addingDate(userData).then((isSaved)=>{
        if (isSaved=== 'done'){
          console.log('se guardo')
        }
        else {
          console.log('no se guardo')
        }
      });

    }

    

   

    return (
        <>
         <Container>
           <FormWrap>
              <Icon to="/">Eco-Sol </Icon>
              <FormContent>
                  <Form onSubmit={handleSubmit} action='#'>´
                      <FormH1>Solicitar Pedido</FormH1>

                      <FormLabel htmlFor='for'>Nombre compreto </FormLabel>
                      <FormInput type='text' required name="nombre" onChange={saveData}/>

                      <FormLabel htmlFor='for'>Correo Electronico</FormLabel>
                      <FormInput type='email' required name="correo" onChange={saveData}/>

                      <FormLabel htmlFor='for'>Telefono</FormLabel>
                      <FormInput type='number' required name="telefono" onChange={saveData}/>

                      <FormLabel htmlFor='for'>Domicilio: Calle. </FormLabel>                     
                      <FormInput type='text' required name="calle" onChange={saveData}/>

                      <FormLabel htmlFor='for'>Domicilio:  N°. </FormLabel>
                      <FormInput type='text' required name="numero" onChange={saveData}/>

                      <FormLabel htmlFor='for'>CP</FormLabel>
                      {/* <FormInput onChange={getCP} type='text' name="cp" required /> */}
                      <FormInput onChange={saveData} type='text' name="cp" required />

                      <FormLabel htmlFor='for'>Colonia. </FormLabel> 
                      <SelectOptions cp={userData.cp} setUserData={setUserData} userData={userData} name="colonia"></SelectOptions >

                      <FormLabel htmlFor='for'>Tipo de servicio requerido: Recolecion (aceite quemado, residuos peligrosos), Maquinita ? </FormLabel>
                      <FormInput type='text' required name="servicio" onChange={saveData}/>
                      
                      <FormLabel htmlFor='for'>Que dia quiere su cita? </FormLabel>
                      <Calendar name="cita" setUserData={setUserData} userData={userData} ></Calendar>

                      <FormButton  type='submit' value="Enviar"/>

                      <Text>Gracias Por Su confianza.</Text>
                      <Icon to="/">Regresar </Icon>
                  </Form>
              </FormContent>
           </FormWrap>  
         </Container>   
        </>
    );
};

export default SignIn;