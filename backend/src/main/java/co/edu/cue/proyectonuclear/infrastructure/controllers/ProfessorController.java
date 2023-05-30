package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/professors/{nid}")
    public ResponseEntity<ProfessorDTO> getProfessorByNid(@PathVariable String nid){
        Optional<ProfessorDTO> professorDTO = professorService.getProfessorByNid(nid);
        if (professorDTO.isEmpty())
            throw new ProfessorException("No se ha encontrado un profesor con numero de identificacion: "+nid, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(professorDTO.get(), HttpStatus.OK);
    }

    @GetMapping("/professors/{id}")
    public ResponseEntity<ProfessorDTO> getProfessorById(@PathVariable Long id){
        Optional<ProfessorDTO> professorDTO = professorService.getProfessorById(id);
        if (professorDTO.isEmpty())
            throw new ProfessorException("No se ha encontrado un profesor con id: "+id, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(professorDTO.get(), HttpStatus.OK);
    }

    @PostMapping("/professors")
    public ProfessorDTO saveProfessor(@Valid @RequestBody CreateProfessorRequestDTO professor){
        return professorService.saveProfessor(professor);
    }
}
