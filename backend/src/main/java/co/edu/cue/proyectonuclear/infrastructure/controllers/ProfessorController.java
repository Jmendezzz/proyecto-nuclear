package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class ProfessorController {
    ProfessorService professorService;

    @GetMapping("/professors")
    public List<Professor> getAllProfessor(){
        return professorService.getAllProfessor();
    }

    @GetMapping("/professors/{id}")
    public Optional<Professor> getProfessorById(Long id){
        return professorService.getProfessorById(id);
        //Ojo falta validar
    }

    @PostMapping("/professors")
    public Professor saveProfessor(@RequestBody Professor professor){
        return professorService.saveProfessor(professor);
    }
}
