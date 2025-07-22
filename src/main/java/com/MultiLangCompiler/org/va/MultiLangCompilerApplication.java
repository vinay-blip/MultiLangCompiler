package com.MultiLangCompiler.org.va;

import com.MultiLangCompiler.org.va.Entity.User;
import com.MultiLangCompiler.org.va.dao.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class MultiLangCompilerApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context  = SpringApplication.run(MultiLangCompilerApplication.class, args);
	}

}
