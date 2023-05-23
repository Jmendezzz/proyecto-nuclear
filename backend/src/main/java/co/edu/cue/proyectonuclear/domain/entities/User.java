package co.edu.cue.proyectonuclear.domain.entities;
import co.edu.cue.proyectonuclear.domain.enums.Role;
import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(length = 50)
    private String name;

    @Column(name = "last_name" , length = 50)
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Role role;


    @Column(length = 50)
    private String email;


    @Column(length = 50)
    private String password;
}
