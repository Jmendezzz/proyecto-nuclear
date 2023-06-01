package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ClassroomMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@AllArgsConstructor
public class ClassroomDAOImpl implements ClassroomDAO {

    @PersistenceContext
    EntityManager entityManager;
    ClassroomMapper classroomMapper;


    @Override
    public Optional<ClassroomDTO> saveCourse(ClassroomDTO classroomDTO) {

        Classroom classroom = classroomMapper.mapFromDTO(classroomDTO);
        Classroom classroomSaved = entityManager.merge(classroom);
        return Optional.of(classroomMapper.mapFromEntity(classroomSaved));

    }


    @Override
    public List<ClassroomDTO> getAllClassrrom() {
        String query = "FROM Classroom ";
        List<Classroom>classrooms=entityManager.createQuery(query).getResultList();
        return mapEntityList(classrooms);

    }


    @Override
    public Optional<ClassroomDTO> findCourseById(Long id) {
        Classroom classroom = entityManager.find(Classroom.class, id);
        return Optional.of(classroomMapper.mapFromEntity(classroom));
    }

    @Override
    public Optional<ClassroomDTO> updateClassroom(ClassroomDTO classroom) {
        Classroom classroomEntity = classroomMapper.mapFromDTO(classroom);
        Classroom classroomUpdated = entityManager.merge(classroomEntity);
        return Optional.of(classroomMapper.mapFromEntity(classroomUpdated));
    }



    @Override
    public Optional<ClassroomDTO> getClassroomById(Long id) {
        Classroom classroom=entityManager.find(Classroom.class,id);
        return Optional.of(classroomMapper.mapFromEntity(classroom));

    }

    @Override
    public Optional<ClassroomDTO> deleteClassroomById(Long id) {
        Classroom classroomEntity=entityManager.find(Classroom.class,id);
        entityManager.remove(classroomEntity);
        return null;
    }

    private List<ClassroomDTO> mapEntityList(List<Classroom>classrooms){
        return classrooms.stream()
                .map(s-> classroomMapper.mapFromEntity(s))
                .toList();
    }
}
