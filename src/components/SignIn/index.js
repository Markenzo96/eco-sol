import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container,  FormWrap, Icon, FormContent, Form, FormLabel, input, FormButton,  Text} from './SigninElemets';
import SelectOptions from './SelectOptions';
import { Servicios } from "./Servicios";
import validator from 'validator';
import { useAlert } from "react-alert";
import { addingDate } from "../../tools/request";

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
    const [colCheck, setColCheck] = useState(false);
    const alert = useAlert();
    const today = new Date();

    useEffect(() => {
      setUserData({
        ...userData,
        calendario: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      });
    }, [])

    const validText = (text) => {
      const newText = text.replace(' ', 'x');
      const isAlpha = validator.isAlpha(newText);
      
      console.log(newText);

      if(!isAlpha){
        return '';
      }else{
        return text;
      }
    }

    const [validPhoneEmail, setValidPhoneEmail] = useState({
      cel: false,
      email: false,
      cp: false,
    })

    const handleDiferentCol = (e) => {
      const {name, value} = e.target;

      if(name === 'cp1'){
        if(value.length !== 5){
          setValidPhoneEmail({
            ...validPhoneEmail,
            cp: false
          });
        }else{
          setValidPhoneEmail({
            ...validPhoneEmail,
            cp: true
          });
        }
        setUserData({
          ...userData,
          cp: value
        });
      }else{
        setUserData({
          ...userData,
          col: value
        });
      }
    }

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
      if(window.confirm('Estás apunto de agregar una cita. ¿Deseas continuar?')){
        if(!validPhoneEmail.cel || !validPhoneEmail.email){
          setWasSend(true);
          alert.error('Error con el celular/correo. Favor de validar');
        }else{
          if(validText(userData.name) === '' || 
              validText(userData.apellidoP) === '' || 
              validText(userData.apellidoM) === '' ||
              validText(userData.col) === ''
          ){
            setWasSend(true);
            alert.error('Algún dato de texto contiene números o símbolos. Favor de validar');
          }else{
            const newDate = new Date(userData.calendario);
            if(today.getHours() >= 17 && today.getDate() === newDate.getDate()){
              setWasSend(true);
              alert.info('La cita no puede ser agendada por la hora, intente otro día');
            }else if((today.getHours() <= 17 && newDate.getDate() === today.getDate()) || (newDate.getDate() > today.getDate())){
              
              if(userData.col === 'Colonias'){
                setWasSend(true);
                alert.info('Seleccione una colonia');
              }else{
                addingDate(userData).then((isSaved)=>{
                    setWasSend(true);
                    if (isSaved=== 'done'){
                      alert.show('Se ha agendado su cita con éxito.');
                    }else if(isSaved === 'full'){
                      alert.info('El día se encuentra lleno. Porfavor seleccione otro');
                    }else {
                      alert.error('Error agendando cita');
                    }
                });
              }
            }else{
              setWasSend(true);
              alert.info('La cita no puede ser agendada en días anteriores, intente otro día.');
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
                            <FormLabel htmlFor='for' className="form-label">Correo Electrónico</FormLabel>
                            <input 
                              type='email' 
                              className="form-control"
                              required 
                              name="email" 
                              onChange={saveData}
                            />
                            { validPhoneEmail.email || <div className="mt-2"><span style={{color: 'yellow'}}>No es un correo valido</span></div>}
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Teléfono</FormLabel>
                            <input 
                              type='number'
                              className="form-control" 
                              required 
                              name="cel"
                              autoComplete="off"
                              onChange={saveData}
                            />
                            {validPhoneEmail.cel || <div className="mt-2"><span style={{color: 'yellow'}}>El teléfono no cuenta con 10 números</span></div>}
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
                            <FormLabel htmlFor='for' className="form-label">Número Exterior </FormLabel>
                            <input 
                              type='number'
                              className="form-control" 
                              required 
                              name="numeroExt" 
                              onChange={saveData}
                            />
                          </div>
                          <div className="col">
                            <FormLabel htmlFor='for' className="form-label">Número Interior</FormLabel>
                            <input 
                              type='number'
                              className="form-control"
                              name="numeroInt" 
                              onChange={saveData}
                            />
                          </div>
                        </div>

                        {colCheck || <div className="row">
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
                        </div>}
                        <div className="row mt-3 mb-3">
                          <div className="col">
                            <div className="form-check">
                              <input 
                                className="form-check-input" 
                                type="checkbox"
                                style={{
                                  borderColor: '#F4CC23',
                                  color: '#355A9F'
                                }}
                                onChange={() => {
                                  setColCheck(!colCheck);
                                  setValidPhoneEmail({
                                    ...validPhoneEmail,
                                    cp: colCheck,
                                  })
                                }}
                              />
                              <label className="form-check-label" style={{color:'white'}}>
                                ¿No encontraste tu colonia?
                              </label>
                            </div>
                          </div>
                        </div>
                        {
                          colCheck 
                          &&
                          <div className="row mb-3">
                            <div className="col">
                              <FormLabel htmlFor='for' className="form-label">CP</FormLabel>
                              <input 
                                type='number' 
                                name="cp1"
                                className="form-control" 
                                required 
                                onChange={handleDiferentCol} 
                              />
                              {validPhoneEmail.cp || <div className="mt-2"><span style={{color: 'yellow'}}>El código postal debe ser de 5 dígitos</span></div>}
                            </div>
                            <div className="col">
                              <FormLabel htmlFor='for' className="form-label">Colonia</FormLabel>
                              <input 
                                type='text' 
                                name="col1"
                                className="form-control" 
                                required 
                                onChange={handleDiferentCol} 
                              />
                            </div>
                          </div>
                        }
                        <div className="row">
                          <div className="col mb-4">
                            <FormLabel htmlFor='for' className="form-label">¿Qué servicio es el que requiere?</FormLabel>
                            <select className="form-select" name="servicios" onChange={saveData}>
                              <Servicios />
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <FormLabel htmlFor='for' className="me-2">¿Qué día requiere su cita? </FormLabel>
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
                        <Text>Gracias por su confianza.</Text>
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