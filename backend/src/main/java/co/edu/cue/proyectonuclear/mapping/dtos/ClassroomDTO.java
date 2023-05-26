package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.domain.enums.Tipology;

import java.util.List;

public record ClassroomDTO (
        Long id,
        Location location,
        Integer capability,
        List<Element> elements,
        Tipology tipology
){

}