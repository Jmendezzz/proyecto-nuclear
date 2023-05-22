package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Subject {
    private  Long id;
    private String name;
    private Career career;
    private Integer semester;
    private  Integer credits;


}
