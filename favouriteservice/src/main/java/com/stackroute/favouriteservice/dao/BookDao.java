package com.stackroute.favouriteservice.dao;

import org.springframework.data.repository.CrudRepository;

import com.stackroute.favouriteservice.model.BookDetails;


public interface BookDao extends CrudRepository<BookDetails, Integer> {
	BookDetails findByUrl(String url);
}
