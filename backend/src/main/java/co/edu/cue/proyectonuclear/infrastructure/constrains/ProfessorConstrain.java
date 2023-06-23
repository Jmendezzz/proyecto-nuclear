package co.edu.cue.proyectonuclear.infrastructure.constrains;



import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.infrastructure.utils.SubjectUtil;
import co.edu.cue.proyectonuclear.infrastructure.utils.TimeSlotUtil;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestSubjectDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;


@Component
@AllArgsConstructor
public class ProfessorConstrain {
    private final ProfessorDAO professorDAO;
    public void  validateSubjects(List<CreateProfessorRequestSubjectDTO> subjects){
        subjects.forEach(s->{
            if (professorDAO.getProfessorBySubject(s.id()).isPresent()) {
                System.out.println(s.name());
                throw new UserException("La materia "+ s.name() + " ya cuenta con profesor", HttpStatus.BAD_REQUEST);
            }
        });
    }

    public void validateTimeSlotsByProfessorSubject(List<ProfessorScheduleDTO> professorSchedulesDTO) {
        professorSchedulesDTO.forEach(professorScheduleDTO -> {
            List<TimeSlot> timeSlots = professorScheduleDTO.timeSlots();
            // Ordena la lista por startTime
            timeSlots.sort(Comparator.comparing(TimeSlot::getStartTime));
            // Valida la brecha entre startTime y endTime
            validateGapBetweenTimeSlots(timeSlots);
            // Valida que no haya timeSlots con el mismo startTime o endTime
            validateEqualTimeSlots(timeSlots);
            // Valida que no haya overlapping timeSlots
            validateOverlappingTimeSlots(timeSlots);
        });
    }

    public void validateWeeklyHours(Long id, List<ProfessorScheduleDTO> professorSchedulesDTOS) {
        ProfessorDTO professorDTO = professorDAO.getProfessorById(id).get();

        // Obtener la lista de materias asignadas al profesor
        List<SubjectDTO> subjects = professorDTO.subjects();

        // Calcular la suma total de las horas semanales de las materias asignadas al profesor
        int totalWeeklyHours = subjects.
                stream()
                .mapToInt(SubjectUtil::getWeeklyHours)
                .sum();

        //
        System.out.println(totalWeeklyHours);
        int professorScheduleTotalTimeSlots =
                professorSchedulesDTOS
                        .stream()
                        .flatMap(schedule -> schedule.timeSlots().stream())
                        .mapToInt(ts-> TimeSlotUtil.between(ts))
                        .sum();

        System.out.println("TOTAL SLOTS "+ professorScheduleTotalTimeSlots);

        // Calcular el número mínimo de días requeridos según el período y las horas académicas

        for (SubjectDTO subject : subjects){
            int minimumRequiredDays = SubjectUtil.getMinimumRequiredDays(subject);
            int subjectWeeklyHours =  SubjectUtil.getWeeklyHours(subject);
            if( subjectWeeklyHours > professorScheduleTotalTimeSlots  && minimumRequiredDays > professorSchedulesDTOS.size()){
                throw new ProfessorException("No hay suficientes horas para dictar la materia: "
                        + subject.name() + "\n"
                        + "Horas semanales necesarias: " + subjectWeeklyHours + "\n"
                        + "Días semanales necesarios:  " + minimumRequiredDays, HttpStatus.BAD_REQUEST);
            }
            professorScheduleTotalTimeSlots -= subjectWeeklyHours;
        }
    }


    public void validateEqualTimeSlots(List<TimeSlot> timeSlots){
        for (int i = 1; i < timeSlots.size(); i++) {
            TimeSlot currentTimeSlot = timeSlots.get(i);
            TimeSlot previousTimeSlot = timeSlots.get(i - 1);
            if (currentTimeSlot.getStartTime().equals(previousTimeSlot.getEndTime())) {
                throw new ProfessorException("No pueden haber campos iguales", HttpStatus.BAD_REQUEST);
            }
        }
    }

    public void validateOverlappingTimeSlots (List<TimeSlot> timeSlots) {
        boolean hasOverlappingTimeSlots = timeSlots.stream().anyMatch(currentTimeSlot ->
                timeSlots.stream().anyMatch(otherTimeSlot ->
                        !currentTimeSlot.equals(otherTimeSlot) &&
                                currentTimeSlot.getStartTime().isAfter(otherTimeSlot.getStartTime()) &&
                                currentTimeSlot.getStartTime().isBefore(otherTimeSlot.getEndTime()) ||
                                currentTimeSlot.getEndTime().isAfter(otherTimeSlot.getEndTime()) &&
                                currentTimeSlot.getEndTime().isBefore(otherTimeSlot.getStartTime()) ||
                                currentTimeSlot.getStartTime().isAfter(otherTimeSlot.getStartTime()) &&
                                currentTimeSlot.getEndTime().isBefore(otherTimeSlot.getEndTime())
                )
        );
        if (hasOverlappingTimeSlots) {
            throw new ProfessorException("No puede haber un intervalo contenido dentro de otro intervalo", HttpStatus.BAD_REQUEST);
        }
    }

    public void validateGapBetweenTimeSlots(List<TimeSlot> timeSlots) {
        timeSlots.forEach(timeSlot -> {
            if (ChronoUnit.HOURS.between( timeSlot.getStartTime(), timeSlot.getEndTime()) <= 1) {
                throw new ProfessorException("La disponibilidad debe ser de al menos 2 horas", HttpStatus.BAD_REQUEST);
            }
        });
    }
}
