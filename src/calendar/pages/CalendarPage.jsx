import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { CalendarEvent } from '../components/CalendarEvent'
import { NavBar } from "../components/NavBar"

import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useCalendarStore, useUiStore } from '../../hooks'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'




export const CalendarPage = () => {
  
  const {events, setActiveEvent}= useCalendarStore()

  const {openDateModal,}=useUiStore()

  const [lastView,setLastView]=useState(localStorage.getItem('lastView') || 'week')
  
  
  const eventStyleGetter = (event, start, end, isSelected)=>{
    
    const style={
      backgroundColor:' #347CF7 ',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    
    return{
      style
    }
  
  }

  const onDoubleClick=(event)=>{
    //console.log({doubleClick:event})//este ve cuando hacemos doble click
    openDateModal();
    
  }
  const onSelect=(event)=>{
    //console.log({click:event})//un click
    setActiveEvent(event)
  }

  const onViewChanged=(event)=>{
   localStorage.setItem('lastView' , event); //cuando recargo me deja en la pantalla q estaba antes
    setLastView(event)
  }
  
  return (
    <>
    <NavBar/>

    <Calendar
    culture='es'
      localizer={ localizer }
      events={ events }
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100vh', }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

      <CalendarModal />

      <FabAddNew />
      <FabDelete/>

    </>
  )
}
