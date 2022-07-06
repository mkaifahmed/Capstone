package com.stackroute.userservice.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.jwt.JwtTokenUtil;
import com.stackroute.userservice.model.BookDetails;

@Service
public class BookKeeperService {
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	public String getUsername(HttpServletRequest req) {
		String auth = req.getHeader("Authorization").substring(7);
		return jwtTokenUtil.getUsernameFromToken(auth);
		
	}
	public void saveBook(BookDetails bdd, HttpServletRequest req) {
		String username = getUsername(req);
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.postForEntity("http://localhost:8765/save?user="+username, bdd, String.class);
	}
	public List<BookDetails> getAllBooks(HttpServletRequest req) {
		String username = getUsername(req);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> bdd = restTemplate.getForEntity("http://localhost:8765/list?user="+username, String.class);
		ObjectMapper mapper = new ObjectMapper();
		List<BookDetails> bd = null;
		try {
			bd = mapper.readValue(bdd.getBody(), List.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return bd;
		
	}
	public String deleteBook(String url, HttpServletRequest req) {
		String username = getUsername(req);
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.delete("http://localhost:8765/delete?url="+url+"&user="+username);
		return "deleted";
	}
	public boolean isFavorite(String url, HttpServletRequest req) {
		String username = getUsername(req);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Boolean> bd = restTemplate.getForEntity("http://localhost:8765/isFavorite?url="+url+"&user="+username, Boolean.class);
		return bd.getBody();
	}
	
}