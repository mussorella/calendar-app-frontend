import { parseISO } from "date-fns"


export const convertEventsToDateEvents = (events=[]) => {
  return events.map(event =>{
    
    event.start=parseISO(event.start)//con parse iso puedo cambiar el evento a un evento con fecha
    event.end=parseISO(event.end)
    
    
    
    return event
  })
}
