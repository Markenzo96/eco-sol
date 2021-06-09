
 export const addingDate = async (userData)  => {

  try {
    const formdata = new FormData();

    formdata.append('name', userData.name);
    formdata.append('lastF', userData.apellidoP);
    formdata.append('lastM', userData.apellidoM);
    formdata.append('email', userData.email);
    formdata.append('cel', userData.cel);
    formdata.append('street', userData.calle);
    formdata.append('numExt', userData.numeroExt);
    formdata.append('numInt', userData.numeroInt === '' ? 0 : userData.numeroInt);
    formdata.append('cp', userData.cp);
    formdata.append('col', userData.col);
    formdata.append('dt', userData.calendario);
    formdata.append('pdt', userData.servicios);
    formdata.append('st', '1');

    const res = await fetch('http://ecosol.club/apis/addDateUser.php',{
        method:'POST',
        body: formdata
    });

    if(!res.ok || res.status !== 200){
      console.error(`Error ${res.status}`);
      return null;
    }

    const {data} = await res.json();

    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getProducts = async () => {

  try {
    
    const url = 'http://localhost:80/apis/getProducts.php';
    const response = await fetch(url);

    if(!response.ok || response.status !== 200){
      console.error(`Error: ${response.status}`);
      return null;
    }

    const {data} = await response.json();

    return data;
  }catch(e){
    console.error(e);
    return null;
  }
}