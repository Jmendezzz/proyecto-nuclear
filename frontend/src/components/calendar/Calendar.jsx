import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import style from "./calendarStyle.css";

const dayMap = {
  'MONDAY': 1,
  'TUESDAY': 2,
  'WEDNESDAY': 3,
  'THURSDAY': 4,
  'FRIDAY': 5
};

export const Calendar = ({ data }) => {
  console.log(data);
  const events = data.flatMap(item => {
    console.log(item);
    return item.courseSchedule.map(scheduleItem => {
      const timeSlot = scheduleItem.timeSlot;
      const startTime = timeSlot.startTime.split(':');
      const endTime = timeSlot.endTime.split(':');
      const start = new Date();
      start.setDate(start.getDate() + (dayMap[scheduleItem.day] - start.getDay()));
      start.setHours(startTime[0], startTime[1], 0, 0);
      const end = new Date(start);
      end.setHours(endTime[0], endTime[1], 0, 0);
      return {
        title: `${item.subject.name} - ${scheduleItem.classroom ? scheduleItem.classroom.name : "Salón: Sin asignar"}`,
        start,
        end
      };
    });
  });

  return (
    <FullCalendar
    themeSystem='bootstrap'
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      hiddenDays={[0, 6]} // hide Sundays and Saturdays
      slotMinTime="07:00:00"
      slotMaxTime="22:00:00"
      locale={esLocale}
      dayHeaderFormat={{
        weekday: 'long',
        month: 'short',
        day: 'numeric',

      }}
      navLinks={false}
      weekNumbers={false}
      headerToolbar={false}
      footerToolbar={false}
      height={"auto"}
      aspectRatio={1}
      allDaySlot={false}
      events={events}
    />
  );
}

