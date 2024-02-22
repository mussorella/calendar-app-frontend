import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"



describe('pruebas en uiSlice', () => { 
    
    
    test('debe de regresar el valor por defecto', () => {
        
        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen:false})



         }) 
        
    test('debe de cambiar el isDateModalOpen correctamente', () => { 

        let state= uiSlice.getInitialState();
        state=uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();
        state=uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();


     })
        
        
        
        })