package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.infrastructure.constrains.CourseConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.*;
import co.edu.cue.proyectonuclear.services.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseDAO courseDAO;
    private final ProfessorService professorService;
    private final SubjectService subjectService;
    private final StudentService studentService;
    private final ClassroomService classroomService;

    private final CourseConstrain courseConstrain;


    @Override
    public CourseDTO saveCourse(CourseDTO course) {
        return courseDAO.saveCourse(course);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        return courseDAO.getAllCourses();
    }

    @Override
    public Optional<CourseDTO> getCourseById(Long id) {
        return Optional.of(courseDAO.findCourseById(id));
    }

    @Override
    public List<CourseDTO> getCoursesByProfessorId(Long professorId) {
        return  courseDAO.getCoursesByProfessorId(professorId);
    }
    @Override
    public List<CourseStudentRequestDTO> getCoursesByStudentId(Long id) {
        return courseDAO.getCoursesByStudentId(id);
    }

    @Override
    public List<CourseDTO>  generateCourses() {

        List<CourseDTO> courseDTOS;

        subjectService.getAllSubjects().stream().forEach(subject ->{
            ProfessorDTO professorDTO = courseConstrain.validateSubjectIsAssignedToProfessor(subject);
            List<StudentDTO> students =studentService.getStudentsBySubjectId(subject.id());


        });



        return null;

        //TODO
    }



}
