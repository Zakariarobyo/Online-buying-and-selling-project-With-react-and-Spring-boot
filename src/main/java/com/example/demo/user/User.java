package com.example.demo.user;

import com.example.demo.ads.Ads;
import com.example.demo.role.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String password;


    @JsonIgnoreProperties("user")
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private Set<Ads> ads;


    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();


    public User(){

    }
    public User(String name, String phone){
        this.name = name;
        this.phone = phone;
    }

    public User(Long id, String name, String phone, String password,Set<Ads> ads, List<Role> roles) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.ads =ads;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Ads> getAds() {
        return ads;
    }

    public void setAds(Set<Ads> ads) {
        this.ads = ads;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }


}
