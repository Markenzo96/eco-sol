import React, { useEffect, useState } from 'react'
import { getProducts } from '../../tools/request';

export const Servicios = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((listPro)=>{
            setProducts([...listPro]);
        });
    }, [])

    return (
        <>
            {
                products.map(pro => <option key={pro.id} value={pro.id}>{pro.product}</option>)
            }
        </>
    )
}
