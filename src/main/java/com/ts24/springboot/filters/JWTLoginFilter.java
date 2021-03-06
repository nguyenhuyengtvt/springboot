package com.ts24.springboot.filters;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ts24.springboot.dto.LoginDto;
import com.ts24.springboot.service.TokenAuthenticationService;
import com.ts24.springboot.service.impl.TokenAuthenticationServiceImpl;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

	private TokenAuthenticationService tokenAuthenticationService = new TokenAuthenticationServiceImpl();

	public JWTLoginFilter(String url, AuthenticationManager authManager) {
		super(new AntPathRequestMatcher(url));
		setAuthenticationManager(authManager);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException, IOException, ServletException {
		LoginDto account = new ObjectMapper().readValue(req.getInputStream(), LoginDto.class);
		return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(account.getUsername(),
				account.getPassword(), Collections.emptyList()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException, ServletException {
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(auth.getPrincipal());
		PrintWriter out = res.getWriter();
		out.write(json);
		res.addHeader("Content-Type", "application/json; charset=UTF-8");
		tokenAuthenticationService.addAuthentication(res, auth);
	}

}
