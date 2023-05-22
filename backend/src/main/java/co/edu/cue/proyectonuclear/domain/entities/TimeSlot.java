package co.edu.cue.proyectonuclear.domain.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class TimeSlot {

    private LocalTime startTime;
    private LocalTime endTime;

}
