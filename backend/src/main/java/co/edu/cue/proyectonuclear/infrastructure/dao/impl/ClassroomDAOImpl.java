package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.exceptions.ClassroomException;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ClassroomMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.util.Collections;
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
    public ClassroomDTO saveCourse(ClassroomDTO classroomDTO) {

        Classroom classroom = classroomMapper.mapFromDTO(classroomDTO);
        Classroom classroomSaved = entityManager.merge(classroom);
        return classroomMapper.mapFromEntity(classroomSaved);

    }


    @Override
    public List<ClassroomDTO> getAllClassrrom() {
        String query = "FROM Classroom ";
        List<Classroom> classrooms = entityManager.createQuery(query).getResultList();
        return mapEntityList(classrooms);

    }


    @Override
    public Optional<ClassroomDTO> findClassroomById(Long id) {
        Classroom classroom = entityManager.find(Classroom.class, id);
        return Optional.of(classroomMapper.mapFromEntity(classroom));
    }

    @Override
    public ClassroomDTO updateClassroom(ClassroomDTO classroom) {
        Classroom classroomEntity = entityManager.find(Classroom.class, classroom.id());
        if (classroomEntity == null)
            throw new ClassroomException("Can not update, the id:" + classroom.id() + " does not exists", HttpStatus.BAD_REQUEST);
        classroomEntity.setName(classroom.name());
        classroomEntity.setLocation(classroom.location());
        classroomEntity.setCapability(classroom.capability());
        classroomEntity.setElements(classroom.elements());
        classroomEntity.setTipology(classroom.tipology());
        Classroom classroomUpdated = entityManager.merge(classroomEntity);
        return classroomMapper.mapFromEntity(classroomUpdated);
    }

    @Override
    public Optional<ClassroomDTO> getClassroomById(Long id) {
        Classroom classroom=entityManager.find(Classroom.class,id);
        return Optional.of(classroomMapper.mapFromEntity(classroom));

    }

    @Override
    public ClassroomDTO deleteClassroomById(Long id) {
        Classroom classroomEntity=entityManager.find(Classroom.class,id);
        if (classroomEntity==null)throw new ClassroomException("Can not delete, the id:" + id + " does not exists", HttpStatus.BAD_REQUEST);
        entityManager.remove(classroomEntity);
        return classroomMapper.mapFromEntity(classroomEntity);
    }

    @Override
    public List<ClassroomDTO> searchByCapacity(Integer capability) {
        String query="SELECT * FROM classroom WHERE capability > :capability";
        Query nativeQuery = entityManager.createNativeQuery(query,Classroom.class);
        nativeQuery.setParameter("capability",capability);
        return mapEntityList(nativeQuery.getResultList());
    }

    @Override
    public List<ClassroomDTO> searchByLocation(Location location) {
        String query="SELECT * FROM classroom WHERE location=:location";
        Query nativeQuery=entityManager.createNativeQuery(query,Classroom.class);
        nativeQuery.setParameter("location",location.name());
        List<Classroom>classrooms=nativeQuery.getResultList();
        return mapEntityList(classrooms);
    }


    private List<ClassroomDTO> mapEntityList(List<Classroom>classrooms){
        return classrooms.stream()
                .map(s-> classroomMapper.mapFromEntity(s))
                .toList();
    }
}
