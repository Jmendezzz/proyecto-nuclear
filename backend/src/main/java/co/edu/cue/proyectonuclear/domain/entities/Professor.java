package co.edu.cue.proyectonuclear.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "professor")
public class Professor extends User {

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "professor_id")
    private List<ProfessorSchedule> schedule;

    @OneToMany
    @JoinTable(name = "professor_subjects")
    private List<Subject> subjects;

}
