package com.MultiLangCompiler.org.va.dao;

import com.MultiLangCompiler.org.va.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    // You can add custom query methods here if needed
}