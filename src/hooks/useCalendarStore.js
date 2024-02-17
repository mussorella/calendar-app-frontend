import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
    const { events,activeEvent }=useSelector(state=>state.calendar)
    const { user }=useSelector(state=>state.auth)//tomo el user autenticado
    const dispatch=useDispatch()
    
    
    const setActiveEvent=(calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent= async(calendarEvent)=>{

        try {
            //TODO: update event
        if(calendarEvent.id){
            //actualizado

            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);//con esto busco el id del calendario(es la peticion put del update events) y el backend loa ctualiza segun el user 
            
            dispatch(onUpdateEvent({...calendarEvent, user}));
            return;
        }
            //creando
            const {data}= await calendarApi.post('/events', calendarEvent)
            
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
        
    }
    const startDeletingEvent=async()=>{
    try {
    //Todo: legar al backend
    await calendarApi.delete(`/events/${activeEvent.id}`);
    dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al borrar', error.response.data.msg ('error'))
    
    }
        
    }
     

    const startLoadingEvents=async()=>{
        try {
            const {data}= await calendarApi.get('/events')
            const events= convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events))//disparo el cargador de eventos, los procesa y carga loe veentos que transformamos en data events antes 
            
        } catch (error) {
            console.log('Error al cargar los eventos')
            console.log(error)
            
        }
    }
    return {
    
    //propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    //metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,

    }
  }
    
  

