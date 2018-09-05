package com.ts24.springboot.filters;

import java.util.Calendar;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class TokenHandler {

	final int EXPIRATIONTIME = 1;
	final String SECRET = "JWT_TOKEN_SECRET";

	final public String TOKEN_PREFIX = "Bearer";
	final public String HEADER_STRING = "Authorization";

	public String build(String username) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, EXPIRATIONTIME);

		return Jwts.builder().setSubject(username).setExpiration(calendar.getTime())
				.signWith(SignatureAlgorithm.HS512, SECRET).compact();
	}

	public String parse(String token) {
		String username = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
		return username;

	}

}
