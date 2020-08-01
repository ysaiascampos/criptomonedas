import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size:20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width:100%;
    border-radius:10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;

    }
`;

const Formulario = ({setMoneda, setCriptomoneda}) => {
    const [listacripto, setListacripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'CLP', nombre: 'Peso Chileno' }
    ];
    //utilzar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu Moneda','', MONEDAS);
    //utilzar useCriptomoneda
    const [criptomoneda, SelectCriptomoneda] = useCriptomoneda('Elige tu Criptomoneda','', listacripto);
    //ejecutar llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const resultado = await axios.get(url);
            setListacripto(resultado.data.Data);
        }
        consultarAPI();

    }, []);
    const cotizarMoneda = e => {
        e.preventDefault();
        //validar si ambos campos estan llenos;
        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }
        setError(true);
        //pasar los datos al componente principal
        setMoneda(moneda); 
        setCriptomoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' />: null}
            <SelectMoneda />
            <SelectCriptomoneda />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;