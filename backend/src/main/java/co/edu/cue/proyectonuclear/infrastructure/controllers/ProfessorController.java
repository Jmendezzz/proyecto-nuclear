package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.exceptions.ProfessorNotFoundException;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class ProfessorController {
    ProfessorService professorService;

    @GetMapping("/professors")
    public List<ProfessorDTO> getAllProfessor(){
        return professorService.getAllProfessors();
    }

    @GetMapping("/professors/{id}")
    public ResponseEntity<ProfessorDTO> getProfessorById(@PathVariable Long id){
        ProfessorDTO professorDTO = professorService.getProfessorById(id);
        if (professorDTO == null)
            throw new ProfessorNotFoundException("Could not find a professor with the given id: "+id);
        return new ResponseEntity<>(professorDTO, HttpStatus.OK);
    }

    @PostMapping("/professors")
    public ProfessorDTO saveProfessor(@Valid @RequestBody CreateProfessorRequestDTO professor){
        return professorService.saveProfessor(professor);
    }
}
