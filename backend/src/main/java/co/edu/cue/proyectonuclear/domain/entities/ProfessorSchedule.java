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
@Table(name = "professor_schedule")
public class ProfessorSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Enumerated(EnumType.STRING)
    private DayOfWeek day;

    @ElementCollection
    @CollectionTable(name = "professor_schedule_time_slot", joinColumns = @JoinColumn(name = "professor_schedule_id"))
    private List<TimeSlot> timeSlots;
}
