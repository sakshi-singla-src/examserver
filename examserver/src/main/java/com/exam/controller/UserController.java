package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		Set<UserRole> roles = new HashSet<>();
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("NORMAL");
		
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		
		roles.add(userRole);
		
		return this.userService.createUser(user,roles);
	}
	
	
	
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return this.userService.getUser(username);
	}
	
	//delete the user by id
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") long userId) {
		
		this.userService.deleteUser(userId);
		
	}

}
