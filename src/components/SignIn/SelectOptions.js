import React, { useState, useEffect } from "react";


const SelectOptions = ({ cp, setUserData, userData }) => {
  const [options, setOptions] = useState();

  const saveOption = (e) => {
    setUserData({
      ...userData,
      colonia: e.target.value,
    });
  };

  useEffect(() => {
    fetch(`http://localhost/apis/getCol.php?cp=${cp}`)
    // fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) =>
        response
          .json()
          .then((successData) => {
            setOptions(
              successData.data.map((element, index) => {
                return (
                  <option value={element.colonia} key={index}>
                    {element.colonia}
                  </option>
                );
              })
            );
          })
          .catch((error) => console.log(error))
      )
      .catch((error) => console.log(error));
  }, [cp]);
  
   
  
 
  

  return <select onChange={(e) => saveOption(e)}>{options}</select>;
 

  // const saveOption = (e) => {
  //   setUserData({
  //     ...userData,
  //     colonia: e.target.value
  //   });
  // };

  // return (
  //   <select onChange={(e) => saveOption(e)}>
  //     <option
  //       value="gonzalo"
  //     >
  //       gonzalo
  //     </option>
  //     <option
  //       value="alexa"
  //     >
  //       alexa
  //     </option>
  //   </select>
  // );
};

export default SelectOptions;