package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProfessorSchedule {

    @Id
    @GeneratedValue
    private  Long id;
    private DayOfWeek day;

    @ElementCollection
    @CollectionTable(name = "timeslots", joinColumns = @JoinColumn(name = "schedule_id"))
    private List<TimeSlot> timeSlots;

}
