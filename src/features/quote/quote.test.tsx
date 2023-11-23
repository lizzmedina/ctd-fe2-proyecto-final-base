import { render } from '../../test-utils';
import {  screen, waitFor, fireEvent } from '@testing-library/react';
import Cita from './Cita';

describe('testing <Cita/> ', () => { 
  
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

    test('should show the "Cargando..." message', async () => { 
        render(<Cita />);

        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        fireEvent.change(inputSearch, { target: { value: 'Bart' } })
    
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
        fireEvent.click(butttonSeartch)

        expect(screen.getByText("CARGANDO...")).toBeInTheDocument();
    });

    test('renders character from Api by default', async () => {

        render(<Cita />);
    
        await waitFor(() => screen.findByText(/Bart Simpson/i));
        await waitFor(() => screen.findByText(/Apu Nahasapeemapetilon/i));
    });
    
      test('Search Character', async() => {
        render(<Cita />)
    
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        fireEvent.change(inputSearch, { target: { value: 'Bart' } })
    
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
        fireEvent.click(butttonSeartch)
    
        await waitFor(() => screen.findByText(/liza medina/i))
      });
      
      test('If input is empty, show all characters', async () => {
        render(<Cita />)
    
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
        fireEvent.click(butttonSeartch)
    
        await waitFor(() => screen.findByText(/Bart Simpson/i))
      });
      test('renders error message for invalid input', () => {
        render(<Cita />);
      
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
      
        fireEvent.change(inputSearch, { target: { value: '' } });
        fireEvent.click(butttonSeartch);
      
        expect(screen.getByText("Por favor ingrese un nombre válido")).toBeInTheDocument();
      });
      
      test('clears input and state on "Borrar" button click', () => {
        render(<Cita />);
      
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const buttonClean = screen.getByLabelText(/Borrar/i);
      
        fireEvent.change(inputSearch, { target: { value: 'Homer Simpson' } });
        fireEvent.click(buttonClean);
      
        expect(inputSearch).toHaveValue('');
      });
      
      test('handles API error and displays error message', async () => {
        render(<Cita />);
      
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const butttonSeartch = screen.getByLabelText(/Obtener cita aleatoria/i);
      
        fireEvent.change(inputSearch, { target: { value: 'InvalidName' } });
        fireEvent.click(butttonSeartch);
      
        await waitFor(() => {
          expect(screen.getByText("Hubo un error al obtener la cita. Por favor inténtelo de nuevo")).toBeInTheDocument();
        });
      });
      
      test('fetches and renders quote for valid input', async () => {
        render(<Cita />);
      
        const inputSearch = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        const buttonSearch = screen.getByLabelText(/Obtener cita aleatoria/i);
      
        fireEvent.change(inputSearch, { target: { value: 'Abe Simpson' } });
        fireEvent.click(buttonSearch);
      
        await waitFor(() => {
          expect(screen.getByText("They taste like...burning.")).toBeInTheDocument();
          expect(screen.getByText("liza medina")).toBeInTheDocument();
        });
      });
});