import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser";

describe('pruebas en authSlice', () => { 
    
    
    test('debe de retornar el estado inciial', () => { 

        expect(authSlice.getInitialState()).toEqual(initialState);
     });

    test('debe realizar un login', () => { 
        
        const state= authSlice.reducer(initialState, onLogin(testUserCredentials))//mande primero el estado inicial, y del test credentials, mande los datos para hacer el onlogin que es el payload de los auth slice
        expect(state).toEqual({
            status:'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    });

    test('debe de realizar un logout', () => { 
        
        const state=authSlice.reducer(authenticatedState, onLogout())
        expect(state).toEqual({
            status:'not-authenticated',
            user:{},
            errorMessage: undefined
        })
        });


        test('debe de realizar un logout', () => { 
            const errorMessage='Credenciales no validas'
            const state=authSlice.reducer(authenticatedState, onLogout(errorMessage))
            expect(state).toEqual({
                status:'not-authenticated',
                user:{},
                errorMessage: errorMessage
            })
            });

            test('debe de limpiar el msj de error', () => { 
                const errorMessage='Credenciales no validas'
                const state=authSlice.reducer(notAuthenticatedState, onLogout(errorMessage))
                const newState= authSlice.reducer(state, clearErrorMessage())
                expect(newState.errorMessage).toBe(undefined)
                });
            
            test('debe de realizar un checking', () => { 
                    
                    const state=authSlice.reducer(initialState, onChecking())
                    expect(state).toEqual({
                        status:'checking',
                        user:{},
                        errorMessage: undefined
                    })
                    });




            
                });
        
        



    
    
 