import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";
    
    
    jest.mock("../../src/hooks/useAuthStore")
    jest.mock("../../src/calendar/pages/CalendarPage", ()=>({
        CalendarPage:()=> <h1>CalendarPage</h1>
    }))//con esto evitamso que al renderizar busque renderizar todo, y solamente renderize esto, evitando un error horrible

    
    describe('Pruebas en AppRouter', () => { 
    
        const mockCheckAuthToken= jest.fn()
        beforeEach(()=> jest.clearAllMocks())

    test('debe de mostarr la pantalla de carga y llamar el checkauthToken', () => { 
        
        
        useAuthStore.mockReturnValue({
            status:'checking',
            checkAuthToken: mockCheckAuthToken
        })
        
        render(<AppRouter/>)
        screen.debug()
        expect(screen.getByText('Cargando...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled()
        
         })
    
    test('debe de mostar el login en caso de no estar autenticado', () => { 
        
        
        useAuthStore.mockReturnValue({
            status:'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        const{container}=render(
        <MemoryRouter >
        <AppRouter/>
        </MemoryRouter>
        );

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();

        
    
        })


        test('debe de mostarr el calendario si estamos autenticados ', () => { 


            useAuthStore.mockReturnValue({
                status:'authenticated',
                checkAuthToken: mockCheckAuthToken
            })
    
            render(
            <MemoryRouter >
            <AppRouter/>
            </MemoryRouter>
            );
    
            expect(screen.getByText('CalendarPage')).toBeTruthy();
            
    


         })
    
    
     })