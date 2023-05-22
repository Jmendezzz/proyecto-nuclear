package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Role;

import java.util.List;

public class Professor extends User {


    private List<Subject> subjects;
    public Professor(Long id, String name, String lastName, Role role, String email, String password) {
        super(id, name, lastName, role, email, password);
    }
}
