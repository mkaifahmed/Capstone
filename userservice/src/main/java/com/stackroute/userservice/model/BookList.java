package com.stackroute.userservice.model;

import java.io.Serializable;
import java.util.List;

public class BookList implements Serializable  {
	
	private static final long serialVersionUID = 5268264474440467745L;
	
	private String start;
	private String numFound;
	private List<doc> docs;
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getNumFound() {
		return numFound;
	}
	public void setNumFound(String numFound) {
		this.numFound = numFound;
	}
	public List<doc> getDocs() {
		return docs;
	}
	public void setDocs(List<doc> docs) {
		this.docs = docs;
	}
}
