import { render } from '../../test-utils';
import {  screen, waitFor, fireEvent } from '@testing-library/react';
import Cita from './Cita';

describe('testing <Cita/> ', () => { 
  //funciona
    test('renders Cita component', () => { 
        render(<Cita />);

        const headingCard = screen.getByText(/No se encontro ninguna cita/i);
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
        const buttonClean = screen.getByLabelText(/Borrar/i);

        expect(headingCard).toBeInTheDocument();
        expect(inputSearch).toBeInTheDocument();
        expect(butttonSeartch).toBeInTheDocument();
        expect(buttonClean).toBeInTheDocument();

    });
    //funciona
    test('should show the "Cargando..." message', async () => { 
        render(<Cita />);

        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);

        fireEvent.change(inputSearch, { target: { value: 'Bart' } });
        fireEvent.click(butttonSeartch);

        expect(screen.getByText("CARGANDO...")).toBeInTheDocument();
    });
    //funciona
    test('renders character from Api by default', async() => {
      render(<Cita />)
      const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
      fireEvent.click(butttonSeartch);
      await waitFor(() => screen.findByText(/Bart Simpson/i))
      
    })
    //funciona
      test('Search Character', async () => {
        render(<Cita />)
    
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const butttonSeartch = screen.getByLabelText(/Obtener Cita/i);

        fireEvent.change(inputSearch, { target: { value: 'mil' } });   
        fireEvent.click(butttonSeartch);
        await waitFor(() => screen.findByText(/liza medina/i));
      });
      //funciona
      test('clears input and state on "Borrar" button click', () => {
        render(<Cita />);
      
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const buttonClean = screen.getByLabelText(/Borrar/i);
      
        fireEvent.change(inputSearch, { target: { value: 'Homer Simpson' } });
        fireEvent.click(buttonClean);
      
        expect(inputSearch).toHaveValue('');
      });
     
});