package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.enums.Location;
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


    /**
     *  Este método recibe un objeto ClassroomDTO y lo guarda utilizando el objeto ClassroomDAO.
     *  Luego, devuelve el objeto ClassroomDTO guardado.
     */
    @Override
    public ClassroomDTO saveClassroom(ClassroomDTO classroom) {
        return classroomDAO.saveClassroom(classroom);
    }
    /**
     *  Este método devuelve una lista de todos los objetos ClassroomDTO almacenados en la base de datos,
     *  utilizando el objeto ClassroomDAO.
     */

    @Override
    public List<ClassroomDTO> getAllClassroom() {
        return classroomDAO.getAllClassrrom();
    }

    /**
     * Este método recibe un identificador id y devuelve un objeto ClassroomDTO correspondiente al identificador proporcionado.
     * Utiliza el objeto ClassroomDAO para buscar el aula por su identificador.
     * */
    @Override
    public Optional<ClassroomDTO> getClassroomById(Long id) {
        return classroomDAO.getClassroomById(id);
    }

    /**
     *  Este método recibe un objeto ClassroomDTO y lo actualiza en la base de datos utilizando el objeto ClassroomDAO.
     *  Luego, devuelve el objeto ClassroomDTO actualizado.
    * */
    @Override
    public ClassroomDTO updateClassroom(ClassroomDTO classroomDTO) {

        return classroomDAO.updateClassroom(classroomDTO);
    }

    /**
     *
     : Este método recibe un identificador id y elimina el aula correspondiente de la base de datos utilizando el objeto
     ClassroomDAO.Si se encuentra el aula y se elimina correctamente,devuelve el objeto ClassroomDTO eliminado; de lo contrario, devuelve null.
     */

    @Override
    public ClassroomDTO deleteClassroom(Long id) {
        Optional<ClassroomDTO> classroomToDelete=classroomDAO.getClassroomById(id);
        if (classroomToDelete.isPresent()){
            return classroomDAO.deleteClassroomById(classroomToDelete.get().id());
        }
        return null;
    }

    /**
     *
     Este método recibe una capacidad capability y devuelve una lista de objetos ClassroomDTO que cumplen con esa capacidad.
     Utiliza el objeto ClassroomDAO para buscar las aulas por capacidad.
     */
    @Override
    public List<ClassroomDTO> searchByCapacity(Integer capability) {
        return classroomDAO.searchByCapacity(capability);
    }

    /***
     *
     Este método recibe un objeto Location y devuelve una lista de objetos ClassroomDTO que se encuentran en esa ubicación.
     Utiliza el objeto ClassroomDAO para buscar las aulas por ubicación.
     */
    @Override
    public List<ClassroomDTO> searchByLocation(Location location) {
        return classroomDAO.searchByLocation(location);
    }


}
