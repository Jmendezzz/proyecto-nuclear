package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
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
public class StudentMapperImpl implements StudentMapper {

    @Override
    public StudentDTO mapFromEntity(Student student) {
        if ( student == null ) {
            return null;
        }

        Long id = null;
        String nid = null;
        String name = null;
        String lastName = null;
        String email = null;
        Career career = null;
        Integer semester = null;
        List<Subject> subjects = null;

        id = student.getId();
        nid = student.getNid();
        name = student.getName();
        lastName = student.getLastName();
        email = student.getEmail();
        career = student.getCareer();
        semester = student.getSemester();
        List<Subject> list = student.getSubjects();
        if ( list != null ) {
            subjects = new ArrayList<Subject>( list );
        }

        StudentDTO studentDTO = new StudentDTO( id, nid, name, lastName, email, career, semester, subjects );

        return studentDTO;
    }

    @Override
    public Student mapFromDTO(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        Student student = new Student();

        student.setId( studentDTO.id() );
        student.setNid( studentDTO.nid() );
        student.setName( studentDTO.name() );
        student.setLastName( studentDTO.lastName() );
        student.setEmail( studentDTO.email() );
        List<Subject> list = studentDTO.subjects();
        if ( list != null ) {
            student.setSubjects( new ArrayList<Subject>( list ) );
        }
        student.setSemester( studentDTO.semester() );
        student.setCareer( studentDTO.career() );

        return student;
    }

    @Override
    public List<StudentDTO> mapFrom(List<Student> students) {
        if ( students == null ) {
            return null;
        }

        List<StudentDTO> list = new ArrayList<StudentDTO>( students.size() );
        for ( Student student : students ) {
            list.add( mapFromEntity( student ) );
        }

        return list;
    }

    @Override
    public List<Student> mapFromListDTO(List<StudentDTO> students) {
        if ( students == null ) {
            return null;
        }

        List<Student> list = new ArrayList<Student>( students.size() );
        for ( StudentDTO studentDTO : students ) {
            list.add( mapFromDTO( studentDTO ) );
        }

        return list;
    }

    @Override
    public Student mapFromDTO(CreateStudentRequestDTO studentRequestDTO) {
        if ( studentRequestDTO == null ) {
            return null;
        }

        Student student = new Student();

        if ( studentRequestDTO.id() != null ) {
            student.setPassword( String.valueOf( studentRequestDTO.id() ) );
        }
        student.setUsername( studentRequestDTO.nid() );
        student.setId( studentRequestDTO.id() );
        student.setNid( studentRequestDTO.nid() );
        student.setName( studentRequestDTO.name() );
        student.setLastName( studentRequestDTO.lastName() );
        student.setEmail( studentRequestDTO.email() );
        List<Subject> list = studentRequestDTO.subjects();
        if ( list != null ) {
            student.setSubjects( new ArrayList<Subject>( list ) );
        }
        student.setSemester( studentRequestDTO.semester() );
        student.setCareer( studentRequestDTO.career() );

        student.setRole( co.edu.cue.proyectonuclear.domain.enums.Role.STUDENT );

        return student;
    }
}
