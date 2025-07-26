package com.MultiLangCompiler.org.va.dao;

import com.MultiLangCompiler.org.va.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Find a user by email
    Optional<User> findByGmail(String email);
    
    // Check if a user exists with the given email
    boolean existsByGmail(String email);
}