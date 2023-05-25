package co.edu.cue.proyectonuclear.domain.entities;

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
public class Course {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Professor professor;

    @OneToOne
    private Subject subject;

    @OneToMany
    private List<Student> students;

    @OneToMany
    @JoinColumn(name = "course_id")
    private List<CourseSchedule> courseSchedule;

}
