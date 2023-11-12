package com.fdmgroup.cgt_tracker.model;

import java.math.BigDecimal;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity(name = "USERS")
@Data
@ToString(exclude = "password")
@EqualsAndHashCode(of = "userId")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", updatable = false, nullable = false)
    private Long userId;

    @Column(name = "USERNAME", unique = true, nullable = false, length = 25)
    private String username;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 50)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Event> events;
    
    @Column(name = "SALARY")
    private BigDecimal salary;

}
