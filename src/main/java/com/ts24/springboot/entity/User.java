package com.ts24.springboot.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;

	@Column(name = "password", length = 256)
	private String password;

	@Column(name = "login_id", length = 64)
	private String loginId;

	@Column(name = "email", length = 64)
	private String email;

	@Column(name = "name", length = 64)
	private String name;

	@Override
	@JsonIgnore
	@Transient
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		return authorities;
	}

	@Override
	@JsonIgnore
	@Transient
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	@Transient
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@JsonIgnore
	@Transient
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	@Transient
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return name;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
