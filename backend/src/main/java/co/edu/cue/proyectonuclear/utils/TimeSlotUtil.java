package co.edu.cue.proyectonuclear.utils;

import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

public class TimeSlotUtil {

    public static int  between(TimeSlot timeSlot){
        return (int) ChronoUnit.HOURS.between(timeSlot.getStartTime(),timeSlot.getEndTime());
    }
    public static List<TimeSlot> splitTimeSlot(TimeSlot timeSlot, int duration ) {
        List<LocalTime> hours = new ArrayList<>();

        LocalTime startTime = timeSlot.getStartTime();
        LocalTime endTime = timeSlot.getEndTime();

        LocalTime currentHour = startTime;

        while (currentHour.isBefore(endTime)) {
            hours.add(currentHour);
            currentHour = currentHour.plusHours(1);
        }

        List<TimeSlot> timeSlotsSplited = hours.stream()
                .filter(h -> h.plusHours(duration).isBefore(endTime))
                .map(h -> new TimeSlot(h, h.plusHours(duration)))
                .toList();

        return timeSlotsSplited;
    }
}
