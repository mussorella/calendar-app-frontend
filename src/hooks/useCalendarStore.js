import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {
    const { events,activeEvent }=useSelector(state=>state.calendar)

    const dispatch=useDispatch()
    const setActiveEvent=(calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent= async(calendarEvent)=>{
        //todo: llegar al backend

        //TODO: bien
        if(calendarEvent._id){
            //actualizado
            dispatch(onUpdateEvent({...calendarEvent}))
        }else{
            //creando
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }
    const startDeletingEvent=()=>{
        dispatch(onDeleteEvent())
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

    }
  }
    
  

