
 export const addingDate = async (userData)  => {
    console.log(userData); 
    try {
      
      const formdata = new FormData();
      formdata.append('name', userData.nombre);
      formdata.append('email', userData.correo);
      formdata.append('cel', userData.telefono);
      formdata.append('street', userData.calle);
      formdata.append('num', userData.numeroe);
      formdata.append('cp', userData.codigopostal);
      formdata.append('col', userData.colonia);
      formdata.append('dt', userData.fecha);
      formdata.append('pdt', userData.producto);
      formdata.append('st', userData.status);
      formdata.append('emp', userData.empleado);

      const res = await fetch('http://localhost:80/apis/addDateUser.php',{
          method:'POST',
          body: formdata
      })
      const {data} = await res.json()

      return data;
    } catch (error) {
      console.error(error)
    }

    
  }