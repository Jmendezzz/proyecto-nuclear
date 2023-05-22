package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class Student extends User{
    private List<Subject> subjects;
    private Integer semester;
    private Career career;


    public Student(Long id, String name, String lastName, Role role, String email, String password,List<Subject> subjects,Integer semester,Career career) {
        super(id, name, lastName, role, email, password);
        this.subjects = subjects;
        this.semester= semester;
        this.career= career;
    }
}
