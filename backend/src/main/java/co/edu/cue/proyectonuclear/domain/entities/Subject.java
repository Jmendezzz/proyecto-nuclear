package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String name;
    private Integer academicHours;
    @Enumerated(EnumType.STRING)
    private Career career;

    @Enumerated(EnumType.STRING)
    private Period period;
    private Integer semester;
    private  Integer credits;


}
