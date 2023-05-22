package co.edu.cue.proyectonuclear.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor

public class Course {
    private Long id;
    private Professor professor;
    private Subject subject;
    private List<Student> students;
}
