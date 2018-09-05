package com.ts24.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ts24.springboot.filters.JWTAuthenticationEntryPoint;
import com.ts24.springboot.filters.JWTAuthenticationFilter;
import com.ts24.springboot.filters.JWTLoginFilter;

@Configuration
@EnableWebSecurity
@Order(1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userService;
	
	@Autowired
    private JWTAuthenticationEntryPoint unauthorizedHandler;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
		.csrf().disable()
		.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		.authorizeRequests()
			.antMatchers("/**.bundle.js").permitAll()
			.antMatchers("/static/**").permitAll()
			.antMatchers("/favicon.ico").permitAll()
			.antMatchers("/glyphicons**").permitAll()
			.antMatchers("/banner-brand-default**").permitAll()
			.antMatchers("/assets/**").permitAll()
			.antMatchers("/assets/sound").permitAll()
			.antMatchers("/").permitAll()
			.antMatchers(HttpMethod.POST, "/api/login").permitAll()
			.antMatchers(HttpMethod.GET, "/api/all-book").permitAll()
			.anyRequest().authenticated().and()
		.addFilterBefore(new JWTLoginFilter("/api/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
		.addFilterBefore(new JWTAuthenticationFilter(userService), UsernamePasswordAuthenticationFilter.class)
		.headers().cacheControl();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return userService;
    }
}
