package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record SubjectDTO(
        Long id,
        @NotNull
        String name,
        @NotNull
        Career career,
        @NotNull
        @Min(value=1)
        Integer academicHours,
        @NotNull
        Period period,
        @NotNull
        @Min(value = 1)
        Integer semester,
        @NotNull
        Integer credits
) {
}
