package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ClassroomMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
@AllArgsConstructor
public class ClassroomDAOImpl implements ClassroomDAO {

    @PersistenceContext
    EntityManager entityManager;
    ClassroomMapper classroomMapper;


    @Override
    public ClassroomDTO saveCourse(ClassroomDTO classroomDTO) {

        Classroom classroom = classroomMapper.mapFromDTO(classroomDTO);
        Classroom classroomSaved =  entityManager.merge(classroom);
        return classroomMapper.mapFromEntity(classroomSaved);

    }


    @Override
    public List<ClassroomDTO> getAllClassrrom() {
        String query = "FROM Classroom ";
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    public ClassroomDTO findCourseById(Long id) {
        Classroom classroom = entityManager.find(Classroom.class,id);
        return classroomMapper.mapFromEntity(classroom);
    }
}
