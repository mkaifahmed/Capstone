package com.stackroute.userservice.model;

import java.io.Serializable;
import java.util.List;

public class doc  implements Serializable  {
	
	private static final long serialVersionUID = 4232140918940624363L;
	
	private String title;
	private List<String> edition_key;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<String> getEdition_key() {
		return edition_key;
	}
	public void setEdition_key(List<String> edition_key) {
		this.edition_key = edition_key;
	}
}
