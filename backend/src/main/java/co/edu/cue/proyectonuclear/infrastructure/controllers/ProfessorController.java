package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class ProfessorController {
    ProfessorService professorService;

    @GetMapping("/professors")
    public List<ProfessorDTO> getAllProfessor(){
        return professorService.getAllProfessors();
    }

    @GetMapping("/professors/{id}")
    public Optional<ProfessorDTO> getProfessorById(@PathVariable @Size(max = 20) Long id){
        return professorService.getProfessorById(id);
    }

    @PostMapping("/professors")
    public ProfessorDTO saveProfessor(@RequestBody CreateProfessorRequestDTO professor){
        return professorService.saveProfessor(professor);
    }
}
