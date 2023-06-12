package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestSubjectDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-11T21:03:12-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class ProfessorMapperImpl implements ProfessorMapper {

    @Override
    public ProfessorDTO mapFrom(Professor source) {
        if ( source == null ) {
            return null;
        }

        Long id = null;
        String nid = null;
        String name = null;
        String lastName = null;
        String email = null;
        List<ProfessorScheduleDTO> schedule = null;
        List<SubjectDTO> subjects = null;

        id = source.getId();
        nid = source.getNid();
        name = source.getName();
        lastName = source.getLastName();
        email = source.getEmail();
        schedule = professorScheduleListToProfessorScheduleDTOList( source.getSchedule() );
        subjects = subjectListToSubjectDTOList( source.getSubjects() );

        ProfessorDTO professorDTO = new ProfessorDTO( id, nid, name, lastName, email, schedule, subjects );

        return professorDTO;
    }

    @Override
    public Professor mapFrom(ProfessorDTO source) {
        if ( source == null ) {
            return null;
        }

        Professor professor = new Professor();

        professor.setId( source.id() );
        professor.setNid( source.nid() );
        professor.setName( source.name() );
        professor.setLastName( source.lastName() );
        professor.setEmail( source.email() );
        professor.setSchedule( professorScheduleDTOListToProfessorScheduleList( source.schedule() ) );
        professor.setSubjects( subjectDTOListToSubjectList( source.subjects() ) );

        return professor;
    }

    @Override
    public List<ProfessorDTO> mapFrom(List<Professor> professors) {
        if ( professors == null ) {
            return null;
        }

        List<ProfessorDTO> list = new ArrayList<ProfessorDTO>( professors.size() );
        for ( Professor professor : professors ) {
            list.add( mapFrom( professor ) );
        }

        return list;
    }

    @Override
    public Professor mapFromDTO(CreateProfessorRequestDTO professorRequestDTO) {
        if ( professorRequestDTO == null ) {
            return null;
        }

        Professor professor = new Professor();

        professor.setPassword( professorRequestDTO.nid() );
        professor.setUsername( professorRequestDTO.nid() );
        professor.setNid( professorRequestDTO.nid() );
        professor.setName( professorRequestDTO.name() );
        professor.setLastName( professorRequestDTO.lastName() );
        professor.setEmail( professorRequestDTO.email() );
        professor.setSubjects( createProfessorRequestSubjectDTOListToSubjectList( professorRequestDTO.subjects() ) );

        professor.setRole( co.edu.cue.proyectonuclear.domain.enums.Role.PROFESSOR );

        return professor;
    }

    @Override
    public ProfessorSchedule mapFrom(ProfessorScheduleDTO professorScheduleDTO) {
        if ( professorScheduleDTO == null ) {
            return null;
        }

        ProfessorSchedule professorSchedule = new ProfessorSchedule();

        professorSchedule.setId( professorScheduleDTO.id() );
        professorSchedule.setDay( professorScheduleDTO.day() );
        List<TimeSlot> list = professorScheduleDTO.timeSlots();
        if ( list != null ) {
            professorSchedule.setTimeSlots( new ArrayList<TimeSlot>( list ) );
        }

        return professorSchedule;
    }

    @Override
    public ProfessorScheduleDTO mapFrom(ProfessorSchedule professorSchedule) {
        if ( professorSchedule == null ) {
            return null;
        }

        Long id = null;
        DayOfWeek day = null;
        List<TimeSlot> timeSlots = null;

        id = professorSchedule.getId();
        day = professorSchedule.getDay();
        List<TimeSlot> list = professorSchedule.getTimeSlots();
        if ( list != null ) {
            timeSlots = new ArrayList<TimeSlot>( list );
        }

        ProfessorScheduleDTO professorScheduleDTO = new ProfessorScheduleDTO( id, day, timeSlots );

        return professorScheduleDTO;
    }

    protected List<ProfessorScheduleDTO> professorScheduleListToProfessorScheduleDTOList(List<ProfessorSchedule> list) {
        if ( list == null ) {
            return null;
        }

        List<ProfessorScheduleDTO> list1 = new ArrayList<ProfessorScheduleDTO>( list.size() );
        for ( ProfessorSchedule professorSchedule : list ) {
            list1.add( mapFrom( professorSchedule ) );
        }

        return list1;
    }

    protected SubjectDTO subjectToSubjectDTO(Subject subject) {
        if ( subject == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        Career career = null;
        Integer academicHours = null;
        Period period = null;
        Integer semester = null;
        Integer credits = null;

        id = subject.getId();
        name = subject.getName();
        career = subject.getCareer();
        academicHours = subject.getAcademicHours();
        period = subject.getPeriod();
        semester = subject.getSemester();
        credits = subject.getCredits();

        SubjectDTO subjectDTO = new SubjectDTO( id, name, career, academicHours, period, semester, credits );

        return subjectDTO;
    }

    protected List<SubjectDTO> subjectListToSubjectDTOList(List<Subject> list) {
        if ( list == null ) {
            return null;
        }

        List<SubjectDTO> list1 = new ArrayList<SubjectDTO>( list.size() );
        for ( Subject subject : list ) {
            list1.add( subjectToSubjectDTO( subject ) );
        }

        return list1;
    }

    protected List<ProfessorSchedule> professorScheduleDTOListToProfessorScheduleList(List<ProfessorScheduleDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<ProfessorSchedule> list1 = new ArrayList<ProfessorSchedule>( list.size() );
        for ( ProfessorScheduleDTO professorScheduleDTO : list ) {
            list1.add( mapFrom( professorScheduleDTO ) );
        }

        return list1;
    }

    protected Subject subjectDTOToSubject(SubjectDTO subjectDTO) {
        if ( subjectDTO == null ) {
            return null;
        }

        Subject subject = new Subject();

        subject.setId( subjectDTO.id() );
        subject.setName( subjectDTO.name() );
        subject.setAcademicHours( subjectDTO.academicHours() );
        subject.setCareer( subjectDTO.career() );
        subject.setPeriod( subjectDTO.period() );
        subject.setSemester( subjectDTO.semester() );
        subject.setCredits( subjectDTO.credits() );

        return subject;
    }

    protected List<Subject> subjectDTOListToSubjectList(List<SubjectDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Subject> list1 = new ArrayList<Subject>( list.size() );
        for ( SubjectDTO subjectDTO : list ) {
            list1.add( subjectDTOToSubject( subjectDTO ) );
        }

        return list1;
    }

    protected Subject createProfessorRequestSubjectDTOToSubject(CreateProfessorRequestSubjectDTO createProfessorRequestSubjectDTO) {
        if ( createProfessorRequestSubjectDTO == null ) {
            return null;
        }

        Subject subject = new Subject();

        subject.setId( createProfessorRequestSubjectDTO.id() );
        subject.setName( createProfessorRequestSubjectDTO.name() );

        return subject;
    }

    protected List<Subject> createProfessorRequestSubjectDTOListToSubjectList(List<CreateProfessorRequestSubjectDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Subject> list1 = new ArrayList<Subject>( list.size() );
        for ( CreateProfessorRequestSubjectDTO createProfessorRequestSubjectDTO : list ) {
            list1.add( createProfessorRequestSubjectDTOToSubject( createProfessorRequestSubjectDTO ) );
        }

        return list1;
    }
}
