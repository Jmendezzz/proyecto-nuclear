package co.edu.cue.proyectonuclear.infrastructure.utils;

import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import org.springframework.cglib.core.Local;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

public class TimeSlotUtil {

    public static int  between(TimeSlot timeSlot){
        return (int) ChronoUnit.HOURS.between(timeSlot.getStartTime(),timeSlot.getEndTime());
    }
    public static List<TimeSlot> splitTimeSlot(TimeSlot timeSlot, int duration ) {

        List<LocalTime> hours = getHoursOfTimeSlot(timeSlot);

        List<TimeSlot> timeSlotsSplited = hours.stream()
                .filter(h -> h.plusHours(duration).isBefore(timeSlot.getEndTime().plusHours(1)))
                .map(h -> new TimeSlot(h, h.plusHours(duration)))
                .toList();

        return timeSlotsSplited;
    }

    public static boolean validateTimeCrossing(TimeSlot timeSlotA, TimeSlot timeSlotB){

        LocalTime startTimeA = timeSlotA.getStartTime();
        LocalTime endTimeA = timeSlotA.getEndTime();

        LocalTime startTimeB = timeSlotB.getStartTime();
        LocalTime endTimeB = timeSlotB.getEndTime();

        if (startTimeA.equals(endTimeB) || startTimeB.equals(endTimeA)) {
            return false;
        }

        List<LocalTime> hoursA = getHoursOfTimeSlot(timeSlotA);
        List<LocalTime> hoursB = getHoursOfTimeSlot(timeSlotB);

        return hoursA.stream().anyMatch(h-> hoursB.contains(h));
    }

     private static List<LocalTime> getHoursOfTimeSlot (TimeSlot timeSlot){

        List<LocalTime> hours = new ArrayList<>();

        LocalTime startTime = timeSlot.getStartTime();
        LocalTime endTime = timeSlot.getEndTime();

        LocalTime currentHour = startTime;

        while (currentHour.isBefore(endTime.plusHours(1))) {
            hours.add(currentHour);
            currentHour = currentHour.plusHours(1);
        }
        return hours;

    }
}
