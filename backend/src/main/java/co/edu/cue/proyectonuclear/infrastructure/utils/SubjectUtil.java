package co.edu.cue.proyectonuclear.infrastructure.utils;

import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

public class SubjectUtil {

    public static Integer getWeeklyHours(SubjectDTO subject){
        return (int) Math.floor(subject.academicHours() / (subject.period().equals(Period.TRIMESTRAL) ? 10 : 20));
    }
}
