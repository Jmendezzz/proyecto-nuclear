package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "student")
public class Student extends User {
    @JoinTable(name = "student_subjects")
    @ManyToMany
    private List<Subject> subjects;
    private Integer semester;
    @Enumerated(EnumType.STRING)
    private Career career;
}
