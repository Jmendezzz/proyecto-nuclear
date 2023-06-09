package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CourseSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @ManyToOne
    private Classroom classroom;
    @Enumerated(EnumType.STRING)
    private DayOfWeek day;
    @Embedded
    private TimeSlot timeSlot;
}
