package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professors")
@AllArgsConstructor
public class ProfessorController {
    ProfessorService professorService;

    @GetMapping("/get-all")
    public List<ProfessorDTO> getAllProfessor(){
        return professorService.getAllProfessors();
    }

    @GetMapping("/get-by-id/{id}")
    public Optional<Professor> getProfessorById(@PathVariable @Size(max = 20) Long id){
        return professorService.getProfessorById(id);
    }

    @PostMapping("/save")
    public Professor saveProfessor(@RequestBody Professor professor){
        return professorService.saveProfessor(professor);
    }
}
