package com.ts24.springboot.service.impl;

import static java.util.Collections.emptyList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.ts24.springboot.entity.User;
import com.ts24.springboot.filters.TokenHandler;
import com.ts24.springboot.service.TokenAuthenticationService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class TokenAuthenticationServiceImpl implements TokenAuthenticationService {
	private static final Logger logger = Logger.getLogger(TokenAuthenticationServiceImpl.class);
	private TokenHandler tokenHandler = new TokenHandler();

	@Override
	public void addAuthentication(HttpServletResponse res, Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		String JWT = tokenHandler.build(user.getLoginId());
		res.addHeader(tokenHandler.HEADER_STRING, JWT);
	}

	@Override
	public Authentication getAuthentication(HttpServletRequest request, UserDetailsService userDetailsService)
			throws ExpiredJwtException, UnsupportedJwtException, SignatureException, IllegalArgumentException {

		String token = request.getHeader(tokenHandler.HEADER_STRING);

		if (token != null) {
			String user = null;
			user = tokenHandler.parse(token);
			logger.info(user);
			if (user != null) {
				User authUser = (User) userDetailsService.loadUserByUsername(user);
				logger.info(authUser);
				return new UsernamePasswordAuthenticationToken(authUser, null, emptyList());
			}
			return null;
		}
		return null;

	}

}
