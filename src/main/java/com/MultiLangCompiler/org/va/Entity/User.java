package com.MultiLangCompiler.org.va.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "users") // or "users" if that's your actual table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue
    private UUID key;

    private String gmail;
    private String password;
    private String name;
    private String number;
}
