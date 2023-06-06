package co.edu.cue.proyectonuclear.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Professor professor;

    @OneToOne
    private Subject subject;
    @ManyToMany
    private List<Student> students;

    private LocalDate startDate;

    private LocalDate endDate;

    @OneToMany
    @JoinColumn(name = "course_id")
    private List<CourseSchedule> courseSchedule;

}
