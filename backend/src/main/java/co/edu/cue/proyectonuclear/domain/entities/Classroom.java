package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.domain.enums.Tipology;
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
public class Classroom {
    @Id
    private  Long id;
    @Enumerated(EnumType.STRING)
    private Location location;
    private  Integer capability;
    @ElementCollection
    @CollectionTable(name = "classroom_elements")
    @Column(name = "element")
    @Enumerated(EnumType.STRING)
    private List<Element> elements;
    @Enumerated(EnumType.STRING)
    private Tipology tipology;

}
