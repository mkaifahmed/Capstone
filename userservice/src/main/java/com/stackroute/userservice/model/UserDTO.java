package com.stackroute.userservice.model;

import java.io.Serializable;

public class UserDTO  implements Serializable  {
	
	private static final long serialVersionUID = 7837012407991579156L;
	
	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}