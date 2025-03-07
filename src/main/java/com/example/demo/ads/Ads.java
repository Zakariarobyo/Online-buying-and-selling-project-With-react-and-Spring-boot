package com.example.demo.ads;

import com.example.demo.category.Category;
import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "ads")
public class Ads{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(length = 65555)
    private String description;
    private String image;
    private String location;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("ads")
    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    private User user;


    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("ads")
    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    private Category category;


    public Ads(){

    }

    public Ads(Long id, String title, String description, String image, String location, User user, Category category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.location = location;
        this.user = user;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User users) {
        this.user = users;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
