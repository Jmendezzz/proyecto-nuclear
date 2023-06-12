package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.domain.enums.Tipology;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
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
public class ClassroomMapperImpl implements ClassroomMapper {

    @Override
    public ClassroomDTO mapFromEntity(Classroom classroom) {
        if ( classroom == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        Location location = null;
        Integer capability = null;
        List<Element> elements = null;
        Tipology tipology = null;

        id = classroom.getId();
        name = classroom.getName();
        location = classroom.getLocation();
        capability = classroom.getCapability();
        List<Element> list = classroom.getElements();
        if ( list != null ) {
            elements = new ArrayList<Element>( list );
        }
        tipology = classroom.getTipology();

        ClassroomDTO classroomDTO = new ClassroomDTO( id, name, location, capability, elements, tipology );

        return classroomDTO;
    }

    @Override
    public Classroom mapFromDTO(ClassroomDTO classroomDTO) {
        if ( classroomDTO == null ) {
            return null;
        }

        Classroom classroom = new Classroom();

        classroom.setId( classroomDTO.id() );
        classroom.setName( classroomDTO.name() );
        classroom.setLocation( classroomDTO.location() );
        classroom.setCapability( classroomDTO.capability() );
        List<Element> list = classroomDTO.elements();
        if ( list != null ) {
            classroom.setElements( new ArrayList<Element>( list ) );
        }
        classroom.setTipology( classroomDTO.tipology() );

        return classroom;
    }
}
