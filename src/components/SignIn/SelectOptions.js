import React, { useState, useEffect } from "react";


const SelectOptions = ({ cp = '', setUserData, userData }) => {
  const [options, setOptions] = useState();

  const saveOption = (e) => {
    setUserData({
      ...userData,
      col: e.target.value,
    });
  };

  useEffect(() => {
    if(cp.length === 5){
      fetch(`http://localhost/apis/getCol.php?cp=${cp}`)
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
              setUserData({
                ...userData,
                col: successData.data[0].colonia
              })
            })
            .catch((error) => console.log(error))
        )
        .catch((error) => console.log(error));
    }else{
      setOptions([<option key="selectCol" selected disabled hidden value="defCol">Colonias</option>]);
      setUserData({
        ...userData,
        col: 'Colonias'
      })
    }
  }, [cp, setUserData]);

  return (
    <select className="form-select"onChange={(e) => saveOption(e)}>
      <option key="selectCol" selected disabled hidden value="defCol">Colonias</option>
      {options}
    </select>
  );
};

export default SelectOptions;