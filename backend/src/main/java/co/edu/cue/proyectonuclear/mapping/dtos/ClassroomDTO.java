package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.domain.enums.Tipology;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ClassroomDTO (
        Long id,
        @NotNull
        String name,
        @NotNull
        Location location,
        @NotNull
        Integer capability,
        @NotNull
        List<Element> elements,

        @NotNull(message = "La tipologia no puede estar vacía")
        Tipology tipology
){

}