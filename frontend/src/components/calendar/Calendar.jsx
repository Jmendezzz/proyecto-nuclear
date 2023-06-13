import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

const dayMap = {
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5
  };
  
  export const Calendar = ({ data }) => {
    const events = data.map(item => {
      return item.schedule.map(scheduleItem => {
        return scheduleItem.timeSlots.map(timeSlot => {
          const startTime = timeSlot.startTime.split(':');
          const endTime = timeSlot.endTime.split(':');
          const start = new Date();
          start.setDate(start.getDate() + (dayMap[scheduleItem.day] - start.getDay()));
          start.setHours(startTime[0], startTime[1], 0, 0);
          const end = new Date(start);
          end.setHours(endTime[0], endTime[1], 0, 0);
          return {
            title: `${item.subject} - ${item.classroom}`,
            start,
            end
          };
        });
      });
    }).flat(2);

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      hiddenDays={[0, 6]} // hide Sundays and Saturdays
      slotMinTime="07:00:00"
      slotMaxTime="22:00:00"
      locale={esLocale}
      dayHeaderFormat={{
        weekday: 'long'
      }}
      navLinks={false}
      weekNumbers={false}
      headerToolbar={false}
      footerToolbar={false}
      style={{ height: "100%", width: "100%" }}
      allDaySlot={false}
      events={events}
    />
  );
}

