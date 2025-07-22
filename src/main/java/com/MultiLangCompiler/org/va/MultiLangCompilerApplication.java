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
		UserRepository UR = context.getBean(UserRepository.class );
		User user1 = new User();
		user1.setGmail("vinayrajputtt4892@gmail.com");
		user1.setName("Vinay Rajput");
		user1.setNumber("9719399689");
		user1.setPassword("vinayrajputtt4892@");
		UR.save(user1);

		User user2 = new User();
		user2.setGmail("ashishkumarsingh4892@gmail.com");
		user2.setName("Ashish Singh");
		user2.setNumber("9719378372");
		user2.setPassword("ashishkumarsingh4892@");
		UR.save(user2);

		Iterable<User> AllUsers = UR.findAll();
		AllUsers.forEach(System.out::println);
//		AllUsers.forEach(UR::delete);

	}

}
