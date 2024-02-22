import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks"
import { Provider } from "react-redux"
import { onOpenDateModal, store, uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"
import { initialState } from "../fixtures/calendarStates"
import { act } from "react-dom/test-utils"


const getMockStore=(initialState)=>{//estoy configurandoun store para la linea de pruebas
return configureStore({
    reducer:{
        ui: uiSlice.reducer
    },
    preloadedState:{
        ui: {...initialState}
    }
})
}

describe('pruebas en el uiStore', () => { 
    
    test('debe de regresar los valores por defecto', () => { 
        const mockStore=getMockStore({isDateModalOpen: false})//aca estoy llamando al mockStore de arriba
        const{result}= renderHook(()=> useUiStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>
        })   
    
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        
        })
    
    
    })
    
    test('openDateModal debe de colocar true en el isDateModalOpen', () => { 
        
        
        const mockStore=getMockStore({isDateModalOpen: false})//aca estoy llamando al mockStore de arriba
        const{result}= renderHook(()=> useUiStore(),{
        wrapper:({children})=> //wrapper significa envoltorio
        <Provider store={mockStore}>
            {children}
        </Provider>
        })
        const{ openDateModal}= result.current; //el current seria el del mock store

        act(()=>{
        openDateModal()
        });
        expect(result.current. isDateModalOpen).toBeTruthy()//prgeunta para ver que el is date modal open este en trrue


        })



        test('closeDateModal debe de colocar false en el isDateModalOpen', () => { 
        
        
            const mockStore=getMockStore({isDateModalOpen: true})//aca estoy llamando al mockStore de arriba
            const{result}= renderHook(()=> useUiStore(),{
            wrapper:({children})=> //wrapper significa envoltorio
            <Provider store={mockStore}>
                {children}
            </Provider>
            })
            const{closeDateModal}= result.current; //el current seria el del mock store
    
            act(()=>{
            closeDateModal()
            });
            expect(result.current. isDateModalOpen).toBeFalsy()//aca lo mismo epro tiene que cerarr
    
    
            })
    




     })