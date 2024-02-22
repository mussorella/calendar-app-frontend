import { act, renderHook, waitFor } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks"
import { authSlice } from "../../src/store"
import { initialState,  } from "../fixtures/calendarStates"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"
import { calendarApi } from "../../src/api"





const getMockStore=(initialState)=>{//estoy configurandoun store para la linea de pruebas
    return configureStore({
        reducer:{
            auth:authSlice.reducer
        },
        preloadedState:{
            auth: {...initialState}
        }
    })
    }
describe('pruebas en el useAuthStore', () => { 

    beforeEach(()=> localStorage.clear());


    test('debe de regresar los valores por defecto', () => { 
        
    const mockStore=getMockStore({...initialState})
        const{result}= renderHook(()=> useAuthStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>
        })   
        

        

        expect(result.current).toEqual({
            
            errorMessage: undefined,
            status: undefined,
            user: undefined,
            startLogin: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function),
        })

    })



    test('StartLogin debe de realizar el login correctamente', async() => { 
        ;//siempre limpiar asi no me da falso positivo
        
        
        const mockStore=getMockStore({...notAuthenticatedState});
        
        
        const{result}= renderHook(()=> useAuthStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>});
        
        
        
        await act(async()=>{//si el act va a ser aincrona,a la misma tambien tiene que ser asincrona
        await result.current.startLogin(testUserCredentials)
        })
        
        const {errorMessage, status, user}=result.current
        
        expect({errorMessage, status, user}).toEqual({
            errorMessage:undefined, 
            status: 'authenticated',
            user: {name: 'Test User', uid: '65d33b51b6918719ad4086a5'}
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))

         })

         test('startLogin debe de fallar la autenticacion', async() => { 
            
            ;//siempre limpiar asi no me da falso positivo
        
        
        const mockStore=getMockStore({...notAuthenticatedState});
        
        
        const{result}= renderHook(()=> useAuthStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>});
        
        
        
        await act(async()=>{//si el act va a ser aincrona,a la misma tambien tiene que ser asincrona
        await result.current.startLogin({email:'algo@gmail.com', password: '132165'})
        })

        const {errorMessage, status, user}=result.current
            expect(localStorage.getItem('token')).toBe(null)
            expect({errorMessage, status, user}).toEqual({
                errorMessage: expect.any(String),
                status: 'not-authenticated',
                user: {}
            })

            //el waitfor espera que termine una funcion que es asincrona, o que pase cierto tiempo para ser ejecutada, 
            waitFor(
                ()=>expect(result.current.errorMessage).toBe(undefined)
            )//estamos esperando que despues de cierto tiermpo se active clear error message y mande undefined

             })


        test('startRegister debe de registarr un usuario', async() => { 
            
            const newUser= {email:'algo@gmail.com', password: '132165', name: 'Test User prueba'}
            const mockStore=getMockStore({...notAuthenticatedState});
        
        
        const{result}= renderHook(()=> useAuthStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>});
        
        const spy=jest.spyOn(calendarApi, 'post').mockReturnValue({//el spy se usa cuando una prueba pisa a la otra en la autenticacion, ya que una crea un suario y la otra lo de por ya existente, asi lo anulamos, en este caso usamos en la peticion post de calendar api, la aanulamos para q pueda hacer el testeo y no caer siempre en el post del backend 
            data:{
                ok:true,
                uid: '1263791293',
                name: 'Test User',
                token: 'algun token '
            }
        })//esto se va a ejecutar cuando calendar api haga peticion post
        
        await act(async()=>{//si el act va a ser aincrona,a la misma tambien tiene que ser asincrona
        await result.current.startRegister(newUser)
        })
        const {errorMessage, status, user}=result.current
            expect({errorMessage, status,user}).toEqual({
                errorMessage: undefined,
                status: 'authenticated',
                user: {name: 'Test User', uid: '1263791293'}

            })

            spy.mockRestore(); //siempre que hago un spy, debo poner abajo un spy.mockrestore, lo destruye para que no hagamos cagadas cuando hacemos el post
             })
        

        test('startRegister debe de fallar la creación', async() => { 


            
            const mockStore=getMockStore({...notAuthenticatedState});
        
        
        const{result}= renderHook(()=> useAuthStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>});
        
        
        
        await act(async()=>{//si el act va a ser aincrona,a la misma tambien tiene que ser asincrona
        await result.current.startRegister(testUserCredentials)
        })
        const {errorMessage, status, user}=result.current
            expect({errorMessage, status,user}).toEqual({
                errorMessage: 'Credenciales incorrectas',
                status: 'not-authenticated',
                user: {}

            })

            
             


        })




    test('checkAuthToken debe fallar si no hay un token', async() => { 
        
        const mockStore=getMockStore({...initialState})
        const{result}= renderHook(()=> useAuthStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>
        })   
        
        

        await act(async()=>{
            await result.current.checkAuthToken()

        })
        const {errorMessage, status, user}=result.current
        expect({errorMessage, status, user}).toEqual({
            errorMessage:undefined,
            status: 'not-authenticated',
            user:{}
        })
         
    })
    test('checkAuthToken debe de autenticar el usuario si hay un token', async() => {
        
        const { data } = await calendarApi.post('/auth', testUserCredentials );
        localStorage.setItem('token', data.token );//con esto llamamos al token

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '65d33b51b6918719ad4086a5' }
        });
    })




    })
 