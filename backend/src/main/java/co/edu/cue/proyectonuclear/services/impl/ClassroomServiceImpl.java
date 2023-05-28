package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.ClassroomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor//crea el contructor e inyecta depencia
public class ClassroomServiceImpl implements ClassroomService {
    private final ClassroomDAO classroomDAO;


    @Override
    public ClassroomDTO saveClassroom(ClassroomDTO classroom) {
        return classroomDAO.saveCourse(classroom);
    }

    @Override
    public List<ClassroomDTO> getAllClassroom() {
        return classroomDAO.getAllClassrrom();
    }

    @Override
    public ClassroomDTO getClassroomById(Long id) {
        return classroomDAO.findCourseById(id);
    }
    @Override
    public ClassroomDTO updateClassroom(Long id, ClassroomDTO classroomDTO) {
        ClassroomDTO classroomToUpdate=classroomDAO.getClassroomById(id);
        if (classroomToUpdate !=null){
            ClassroomDTO classroomUpdated=new ClassroomDTO(
                    classroomToUpdate.id(),
                    classroomDTO.name(),
                    classroomDTO.location(),
                    classroomDTO.capability(),
                    classroomDTO.elements(),
                    classroomDTO.tipology()
            );
            return classroomDAO.updateClassroom(classroomUpdated);
        }else {
            return null;
        }

    }
}
