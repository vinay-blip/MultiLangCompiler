package com.MultiLangCompiler.org.va.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "\"key\"", updatable = false, nullable = false)
    private UUID key;

    @Column(nullable = false, unique = true)
    private String gmail;
    
    @Column(nullable = false)
    private String password;
    
    private String name;
    private String number;
}
