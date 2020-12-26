import React from 'react';
import {  render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useEvent from '@testing-library/user-event'
import userEvent from '@testing-library/user-event';

import App from '../App';

test('<App /> La aplicacion funciona bien la primera vez', ()=>{
    // const wrapper = render(<App />);
    // wrapper.debug()

    render(<App />);

    expect( screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect( screen.getByTestId('nombre-app').textContent ).toBe('Administrador de Pacientes');
    expect( screen.getByTestId('nombre-app').tagName ).toBe('H1');


    expect( screen.getByText('No hay citas')).toBeInTheDocument();
    expect( screen.getByText('Crear Cita')).toBeInTheDocument();


});

test('<App /> Agregar Cita y verificar el heading', ()=>{
    // const wrapper = render(<App />);
    // wrapper.debug()

    render(<App />);

    userEvent.type( screen.getByTestId('mascota'), 'Hook');
    userEvent.type( screen.getByTestId('propietario'), 'Ivan');
    userEvent.type( screen.getByTestId('fecha'), '2020-09-01');
    userEvent.type( screen.getByTestId('hora'), '10:30');
    userEvent.type( screen.getByTestId('sintomas'), 'Solo duerme');

     // Selecciona el elemento button submit
     const btnSubmit =  screen.getByTestId('btn-submit');
     // simulamos el evento click en el boton del formulario
     userEvent.click(btnSubmit);

     
    // reviso si sale la alerta
    const alerta = screen.queryByTestId('alerta'); // la diferencia de get es que busca en ves de obtenerlo primero
    expect( alerta ).not.toBeInTheDocument();


    // revisar por le titulo dimanico...
    expect( screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas');
    expect( screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas');

});

// todos los find son asincronos 
test('<App /> Verificar las citas en el DOM', async ()=>{
    // const wrapper = render(<App />);
    // wrapper.debug()

    render(<App />);

    const citas = await screen.findAllByTestId('cita');
    // snapshot crea un archivo para verifiacr el contenido
    // expect( citas ).toMatchSnapshot();

    expect( screen.getByTestId('btn-eliminar').tagName ).toBe('BUTTON');
    expect( screen.getByTestId('btn-eliminar') ).toBeInTheDocument();

    // Verificar alguna cita
    expect( screen.getByText('Hook')).toBeInTheDocument();

});


test('<App /> Eliminar la cita',  ()=>{
    // const wrapper = render(<App />);
    // wrapper.debug()

    render(<App />);
    const btnEliminar = screen.getByTestId('btn-eliminar');
    // verifico si existen los botones
    expect( btnEliminar.tagName ).toBe('BUTTON');
    expect( btnEliminar ).toBeInTheDocument();

    // Simular el click
    userEvent.click(btnEliminar);

    // verifico que se elimino
    expect( btnEliminar ).not.toBeInTheDocument();

    // la cita ya no debe estar
    expect( screen.queryByText('Hook')).not.toBeInTheDocument();
    expect( screen.queryByTestId('cita')).not.toBeInTheDocument();



});