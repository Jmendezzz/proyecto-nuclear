package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
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
    public Optional<ClassroomDTO> saveClassroom(ClassroomDTO classroom) {
        return classroomDAO.saveCourse(classroom);
    }

    @Override
    public List<ClassroomDTO> getAllClassroom() {
        return classroomDAO.getAllClassrrom();
    }

    @Override
    public Optional<ClassroomDTO> getClassroomById(Long id) {
        return classroomDAO.findCourseById(id);
    }

    @Override
    public Optional<ClassroomDTO> updateClassroom(Long id, ClassroomDTO classroomDTO) {
        Optional<ClassroomDTO> classroomToUpdate=classroomDAO.getClassroomById(id);
        if (classroomToUpdate !=null){
            ClassroomDTO classroomUpdated=new ClassroomDTO(
                    classroomToUpdate.get().id(),
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
    @Override
    public Optional<ClassroomDTO> deleteClassroom(Long id) {
        Optional<ClassroomDTO> classroomToDelete=classroomDAO.getClassroomById(id);
        if (classroomToDelete!=null){
            return classroomDAO.deleteClassroomById(classroomToDelete.get().id());
        }
        return null;
    }
}
