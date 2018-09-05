package com.ts24.springboot.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.GenericFilterBean;

import com.ts24.springboot.service.TokenAuthenticationService;
import com.ts24.springboot.service.impl.TokenAuthenticationServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

public class JWTAuthenticationFilter extends GenericFilterBean {

	private UserDetailsService userService;
	private TokenAuthenticationService tokenAuthenticationService = new TokenAuthenticationServiceImpl();

	public JWTAuthenticationFilter(UserDetailsService userService) {
		this.userService = userService;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		try {
			Authentication authentication = tokenAuthenticationService.getAuthentication((HttpServletRequest) request,
					userService);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			filterChain.doFilter(request, response);
		} catch (ExpiredJwtException e) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expire");
			return;
		}
	}

}
