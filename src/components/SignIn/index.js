import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container,  FormWrap, Icon, FormContent, Form, FormLabel, input, FormButton,  Text} from './SigninElemets';
import SelectOptions from './SelectOptions';
import { addingDate } from "../../tools/request";
import { Servicios } from "./Servicios";
import validator from 'validator';
import { useAlert } from "react-alert";

 


const Calendar = ({setUserData, userData}) => {

  const [startDate, setStartDate] = useState(new Date());

  const addDate = (date) => {
    const newDate = new Date(date);
    setUserData({
      ...userData,
      calendario: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
    })
    setStartDate(date);
  }

  return (
    <DatePicker
      onChange={(date) => addDate(date)}
      selected={startDate}
      className="form-control mb-2"
      dateFormat="dd-MM-yyyy"
    />
  );
};

const SignIn = () => {
    const [userData, setUserData] = useState({
      name:'',
      apellidoP:'',
      apellidoM:'',
      email: '',
      cel: '',
      calle:'',
      numeroExt:'',
      numeroInt:'',
      cp:'',
      col:'Colonias',
      servicios:'1',
      calendario: ''
    });
    const [wasSend, setWasSend] = useState(true);
    const alert = useAlert();
    const today = new Date();

    useEffect(() => {
      setUserData({
        ...userData,
        calendario: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      });
    }, [])

    const validText = (text) => {
      const isAlpha = validator.isAlpha(text);

      if(!isAlpha){
        return '';
      }else{
        return text;
      }
    }

    const [validPhoneEmail, setValidPhoneEmail] = useState({
      cel: false,
      email: false
    })

    const saveData = (e) => {
      const {name, value} = e.target;

      if(name === 'cel'){
        if(value.length !== 10){
          setValidPhoneEmail({
            ...validPhoneEmail,
            cel: false
          })
        }else{
          setValidPhoneEmail({
            ...validPhoneEmail,
            cel: true
          })
        }
      }
      if(name ===  'email'){
        if(!validator.isEmail(value)){
          setValidPhoneEmail({
            ...validPhoneEmail,
            email: false
          })
        }else{
          setValidPhoneEmail({
            ...validPhoneEmail,
            email: true
          })
        }
      }

      setUserData({
        ...userData,
        [name] : value
      })
    };

    const handleSubmit = e => {
      e.preventDefault();
      setWasSend(false);
      if(window.confirm('Estas apunto de agregar una cita, ¿Desea continuar?')){
        if(!validPhoneEmail.cel || !validPhoneEmail.email){
          setWasSend(true);
          alert.error('Error con el celular/correo, favor de validar');
        }else{
          if(validText(userData.name) === '' || 
              validText(userData.apellidoP) === '' || 
              validText(userData.apellidoM) === ''
          ){
            setWasSend(true);
            alert.error('Algun dato de texto contiene numeros, favor de validar');
          }else{
            const newDate = new Date(userData.calendario);
            
            if(today.getHours() >= 17 && today.getDate() === newDate.getDate()){
              setWasSend(true);
              alert.info('La cita no puede ser agendada por la hora, intente otro dia');
            }else if(today.getHours() >= 17 && newDate.getDate() > today.getDate()){
              addingDate(userData).then((isSaved)=>{
                  setWasSend(true);
                  if (isSaved=== 'done'){
                    alert.show('Se ha agendado su cita con exito');
                  }else if(isSaved === 'full'){
                    alert.info('El dia se encuentra lleno, porfavor seleccione otro');
                  }else {
                    alert.error('Error agendando cita');
                  }
              });
            }else{
              setWasSend(true);
              alert.info('La cita no puede ser agendada en dias anteriores, intente otro dia.');
            }
          }
        }
      }else{
        setWasSend(true);
      }

    }

    

   

    return (
        <>
         <Container>
           <FormWrap>
              <Icon to="/">Eco-Sol</Icon>
              <div className="container">
                <FormContent>
                    <Form onSubmit={handleSubmit} action='#'>
                        <h1 className="h1" style={{color: 'white'}}>Solicitar Pedido</h1>
                        <h2 className="h2 mb-4 mt-2" style={{color: 'white'}}>Datos generales</h2>
                        <div className="row">
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Nombre</FormLabel>
                            <input 
                              type='text'
                              required 
                              name="name" 
                              onChange={saveData}
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Apellido Paterno</FormLabel>
                            <input 
                              type='text' 
                              required 
                              name="apellidoP" 
                              onChange={saveData}
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Apellido Materno</FormLabel>
                            <input 
                              type='text' 
                              required 
                              name="apellidoM" 
                              onChange={saveData}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Correo Electronico</FormLabel>
                            <input 
                              type='email' 
                              className="form-control"
                              required 
                              name="email" 
                              onChange={saveData}
                            />
                            { validPhoneEmail.email || <div className="mt-2"><span style={{color: 'yellow'}}>No es un email valido</span></div>}
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Telefono</FormLabel>
                            <input 
                              type='number'
                              className="form-control" 
                              required 
                              name="cel"
                              autoComplete="off"
                              onChange={saveData}
                            />
                            {validPhoneEmail.cel || <div className="mt-2"><span style={{color: 'yellow'}}>El telefono no cuenta con 10 numeros</span></div>}
                          </div>
                        </div>
                        <hr style={{color: 'white'}}/>
                        <h2 style={{color: 'white'}}>Domicilio</h2>
                        <div className="row">
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Calle</FormLabel>                     
                            <input 
                              type='text' 
                              required
                              className="form-control" 
                              name="calle" 
                              onChange={saveData}
                            />
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Numero Exterior </FormLabel>
                            <input 
                              type='number'
                              className="form-control" 
                              required 
                              name="numeroExt" 
                              onChange={saveData}
                            />
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Numero Interior</FormLabel>
                            <input 
                              type='number'
                              className="form-control"
                              name="numeroInt" 
                              onChange={saveData}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">CP</FormLabel>
                            <input 
                              type='number' 
                              name="cp"
                              className="form-control" 
                              required 
                              onChange={saveData} 
                            />
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Colonia</FormLabel> 
                            <SelectOptions
                              cp={userData.cp} 
                              setUserData={setUserData} 
                              userData={userData}
                              name="col"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-4">
                            <FormLabel htmlFor='for' className="form-label">Que servicio es el que requiere</FormLabel>
                            <select className="form-select" name="servicios" onChange={saveData}>
                              <Servicios />
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <FormLabel htmlFor='for' className="me-2">Que dia quiere su cita? </FormLabel>
                            <Calendar name="cita" setUserData={setUserData} userData={userData} ></Calendar>
                          </div>
                        </div>
                        <FormButton  type='submit' value="Enviar"/>
                            {
                              wasSend 
                              || 
                              <div className="position-relative m-4">
                                <div className="position-absolute top-50 start-50">
                                  <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                  </div>
                                </div>
                              </div>
                            }
                        <Text>Gracias Por Su confianza.</Text>
                        <Icon to="/">Regresar </Icon>
                    </Form>
                </FormContent>
              </div>
           </FormWrap>  
         </Container>   
        </>
    );
};

export default SignIn;