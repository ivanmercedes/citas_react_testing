import React from 'react';
import {  render, screen, cleanup, fireEvent } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

// funciones spike funciones que no existen solo para los test
const crearCita = jest.fn();


// ejecuta funcion despues de cada prueba para liberar memoria
// afterEach( cleanup );  ya la nuevas versiones lo pone automatico

test('<Formulario /> Cargar el formulario revisar que todo sea correcto', ()=> {
    // const wrapper = render(<Formulario />);
    // wrapper.debug();
     //const { getByText } = render(<Formulario />);
     render(<Formulario crearCita={crearCita} />);
     // buscando que exista el cierto texto en el dom
     expect( screen.getByText('Crear Cita') ).toBeInTheDocument();
     // Seleccionar test desde atrituto data-testid

     // Revisando la etiqueta
     expect( screen.getByTestId('titulo').tagName ).toBe('H2');
     expect( screen.getByTestId('titulo').tagName ).not.toBe('H1');
     // Revisando el texto de la etiqueta
     expect( screen.getByTestId('titulo').textContent ).toBe('Crear Cita');
     

     // Boton de submit
     expect( screen.getByTestId('btn-submit').tagName).toBe('BUTTON')
     expect( screen.getByTestId('btn-submit').textContent).toBe('Agregar Cita')
     expect( screen.getByTestId('btn-submit').textContent).not.toBe('Agregar Nueva Cita');

     


});


test('<Formulario /> Validacion del formulario',()=> {

    // Montando el render
    render(<Formulario crearCita={crearCita} />);

    // Selecciona el elemento button submit
    const btnSubmit =  screen.getByTestId('btn-submit');
    // simulamos el evento click en el boton del formulario
    // fireEvent.click(btnSubmit);
    userEvent.click(btnSubmit);

    // reviso si sale la alerta
    const alerta = screen.getByTestId('alerta');
    expect( alerta ).toBeInTheDocument();
    // revisando por texto
    expect( alerta.textContent ).toBe('Todos los campos son obligatorios');
    // revisando por etiqueta
    expect( alerta.tagName ).toBe('P');

});


test('<Formulario /> Validacion del formulario inputs', ()=>{
    // Montando el render
    render(<Formulario crearCita={crearCita} />);

    
    
});