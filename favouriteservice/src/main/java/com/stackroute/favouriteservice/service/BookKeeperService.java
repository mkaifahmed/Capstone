package com.stackroute.favouriteservice.service;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.dao.BookDao;
import com.stackroute.favouriteservice.dao.UserFavoriteDao;
import com.stackroute.favouriteservice.model.BookDetails;
import com.stackroute.favouriteservice.model.BookDetailsDto;
import com.stackroute.favouriteservice.model.UserFavorite;

@Service
public class BookKeeperService {

	@Autowired
	private BookDao bookDao;
	
	@Autowired
	private UserFavoriteDao userFavoriteDao;
	
	public void saveBook(BookDetailsDto bdd, String user) {
		ObjectMapper mapper = new ObjectMapper();
			try {
				BookDetails bd = mapper.readValue(mapper.writeValueAsString(bdd), BookDetails.class);
				BookDetails bdExist = bookDao.findByUrl(bd.getUrl());
				if(bdExist == null) {
					BookDetails bdSave = bookDao.save(bd);
					UserFavorite usrFav = new UserFavorite(user, bdSave.getUrl());
					userFavoriteDao.save(usrFav);
				} else {
					List<UserFavorite> usrFavList =userFavoriteDao.findByBookUrlAndUser(bdExist.getUrl(), user);
					if(usrFavList.size()<1) {
						UserFavorite usrFav = new UserFavorite(user, bdExist.getUrl());
						userFavoriteDao.save(usrFav);
					}
				}
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	public List<BookDetails> getAllBooks(String user) {
		List<UserFavorite> userList = userFavoriteDao.findByUser(user);
		List<BookDetails> bd =  new ArrayList<BookDetails>();
		if(userList.size() > 0) {
			for (UserFavorite usrFav: userList) {
				bd.add(bookDao.findByUrl(usrFav.getBookUrl()));
			}
		}
		return bd;
		
	}
	public String deleteBook(String url, String user) {
		List<UserFavorite> userList = userFavoriteDao.findByBookUrlAndUser(url, user);
		String out="Not Found";
		
		if(userList.size() > 0) {
			userFavoriteDao.delete(userList.get(0));
		}
		List<UserFavorite> userUrlList = userFavoriteDao.findByBookUrlAndIsNotUser(url, user);
		if(userUrlList.size() == 0 ) {
		BookDetails bd = bookDao.findByUrl(url);
		if(bd != null) {
			
			bookDao.delete(bd);
		}
		}
		out= "deleted";
		return out;
	}
	public boolean isFavorite(String url, String user) {
		List<UserFavorite> userList = userFavoriteDao.findByBookUrlAndUser(url, user);
		return (userList.size() == 1);
	}
	
}
