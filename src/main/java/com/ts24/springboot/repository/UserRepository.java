package com.ts24.springboot.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ts24.springboot.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	
	public Optional<User> findByLoginId(String loginId);

}
