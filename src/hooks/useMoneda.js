import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
const Label = styled.label`
    font-family: 'bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2.4rem;
    display: block;

`;
const Select = styled.select`
    -webkit-appearance: none;
    width: 100%;
    display: block;
    padding: 1rem;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;
const useMoneda = (label, stateInicial, opciones) => {

    const [state, actualizarState] = useState(stateInicial);
    const SelectMoneda = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange ={ e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">--Seleccione--</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
                
            </Select>
        </Fragment>
    );
    //Retornar el state , interfas y function que modifica el state
    return [state, SelectMoneda, actualizarState];
}
 
export default useMoneda;