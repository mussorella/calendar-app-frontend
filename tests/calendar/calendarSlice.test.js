import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../fixtures/calendarStates"

describe('Prueba en calenar Slice', () => { 
    
    
    
    
    
    
    test('Debe de regresar el esatdo por defecto', () => { 
        
        const state= calendarSlice.getInitialState()
        expect(state).toEqual(initialState)
        
         }),
         
         
         
    test('onSetActiveEvent debe activar el evento', () => { 
         
        const state= calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) );
        expect (state.activeEvent).toEqual(events[0]);
        
    });

    test('onAddNewEvent debe de agregar el evento', () => { 
        
        const newEvent={
            id: '3',
            start: new Date('2022-10-21 20:00:00'),
            end: new Date( '2022-10-21 22:00:00' ),
            title: 'newEvent',
            notes: 'algo de prueba',
            };

            const state=calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent) );//aca estoy madnando el ficture de los eventos, mando la accion de agregar uno y el payload seria el evento nuevo
            expect(state.events).toEqual([...events, newEvent])//asi veo si el evento fue agregado, en los corchetes le pongo la coma
        
         });

    test('onUpdateNewEvent debe de actualizar el nuevo evento', () => { 
        const updatedEvent={
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date( '2022-10-21 15:00:00' ),
            title: 'Cumpelaños de fede actualizado',
            notes: 'algo de prueba actualizado',
            };

            const state=calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent) );
            expect(state.events).toContain(updatedEvent)
    
    
        });
    
    test('onDeleteEvent debe de borrar el evento activo', () => { 
        const deletedEvent={
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date( '2022-10-21 15:00:00' ),
            title: 'Cumpelaños de fede borrado',
            notes: 'algo de prueba borrado',
            };

        const state=calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent(deletedEvent));
        expect(state.activeEvent).toBe(null)
        expect(state.events).not.toContain(events[0]);

        
        });

    test('onLoadEvents debe de establecer los eventos', () => { 
         const state= calendarSlice.reducer(initialState, onLoadEvents(events))
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events)

        const newState= calendarSlice.reducer(state, onLoadEvents(events));
        expect(state.events.length).toBe(events.length)
        });
    
    
    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state= calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar());
        expect(state).toEqual(initialState);


     });

     
    



    
    
    
    
 })