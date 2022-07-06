package com.stackroute.favouriteservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.favouriteservice.model.UserFavorite;

@Repository
public interface UserFavoriteDao extends CrudRepository<UserFavorite, Integer>  {
	
	public List<UserFavorite> findByUser(String user);
	
	public List<UserFavorite> findByBookUrl(String bookUrl);
	
	public List<UserFavorite> findByBookUrlAndUser(String bookUrl, String user);
	@Query(
			  value = "SELECT * FROM USER_FAVORITE u WHERE u.BOOK_URL = ?1 AND NOT USER = ?2", 
			  nativeQuery = true)
	public List<UserFavorite> findByBookUrlAndIsNotUser(String url, String user);
	
}