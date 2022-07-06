package com.stackroute.userservice.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.model.BookDetails;
import com.stackroute.userservice.model.BookList;

@Service
public class OpenLibraryService {
	
	
	public BookList getBooks(String searchString) {
		String url="https://openlibrary.org/search.json?q="+searchString;
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		BookList books = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			String bookSearch = restTemplate.getForObject(url, String.class);
			System.out.println(bookSearch);
			books = mapper.readValue(bookSearch, BookList.class);
			System.out.println(books);
		} catch (RestClientException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return books;
	}
	
	public BookDetails getSelectedBook(String bookId) {
		String url="https://openlibrary.org/api/books?bibkeys=OLID:"+bookId+"&jscmd=data&format=json";
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, false);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		BookDetails books = null;
		RestTemplate restTemplate = new RestTemplate();
		try {
			String bookSearch = restTemplate.getForObject(url, String.class);
			bookSearch = bookSearch.substring(bookSearch.indexOf(":", bookSearch.indexOf(":") + 1)+1, bookSearch.length()-1);
			System.out.println(bookSearch);
			books = mapper.readValue(bookSearch, BookDetails.class);
			System.out.println(books);
		} catch (RestClientException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return books;
	}

}
