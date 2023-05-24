package co.edu.cue.proyectonuclear.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class Course {
    @Id
    private Long id;

    @OneToOne
    private Professor professor;

    @OneToOne
    private Subject subject;

    @OneToMany
    private List<Student> students;

    @OneToMany
    private List<CourseSchedule> courseSchedule;

}
