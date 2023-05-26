package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class SubjectController {
    SubjectService subjectService;

    @GetMapping("/subjects")
    public List<SubjectDTO> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/subjects/{id}")
    public Optional<SubjectDTO> getSubjectById(@PathVariable @Size(max = 20) Long id) {
        return subjectService.getSubjectById(id);
    }

    @PostMapping("/subject")
    public SubjectDTO createSubject(@RequestBody SubjectDTO subjectDTO) {
        return subjectService.createSubject(subjectDTO);
    }

}
