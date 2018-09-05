package com.ts24.springboot.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ts24.springboot.entity.User;
import com.ts24.springboot.repository.TUserRepository;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private TUserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		final Optional<User> user = userRepository.findByLoginId(username);
		final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();
		user.ifPresent(detailsChecker::check);
		return user.orElseThrow(() -> new UsernameNotFoundException("user not found."));
	}
}
