package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestSubjectDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-10T11:39:42-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class SubjectMapperImpl implements SubjectMapper {

    @Override
    public SubjectDTO mapFrom(Subject source) {
        if ( source == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        Career career = null;
        Integer academicHours = null;
        Period period = null;
        Integer semester = null;
        Integer credits = null;

        id = source.getId();
        name = source.getName();
        career = source.getCareer();
        academicHours = source.getAcademicHours();
        period = source.getPeriod();
        semester = source.getSemester();
        credits = source.getCredits();

        SubjectDTO subjectDTO = new SubjectDTO( id, name, career, academicHours, period, semester, credits );

        return subjectDTO;
    }

    @Override
    public Subject mapFrom(SubjectDTO source) {
        if ( source == null ) {
            return null;
        }

        Subject subject = new Subject();

        subject.setId( source.id() );
        subject.setName( source.name() );
        subject.setAcademicHours( source.academicHours() );
        subject.setCareer( source.career() );
        subject.setPeriod( source.period() );
        subject.setSemester( source.semester() );
        subject.setCredits( source.credits() );

        return subject;
    }

    @Override
    public Subject mapFrom(CreateProfessorRequestSubjectDTO subjectDTO) {
        if ( subjectDTO == null ) {
            return null;
        }

        Subject subject = new Subject();

        subject.setId( subjectDTO.id() );
        subject.setName( subjectDTO.name() );

        return subject;
    }
}
