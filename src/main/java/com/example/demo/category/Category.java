package com.example.demo.category;

import com.example.demo.ads.Ads;
import com.fasterxml.jackson.annotation.JsonIgnore ;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoryName;

    @JsonIgnoreProperties("category")
    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private Set<Ads> ads;


    public Category(){

    }

    public Category(Long id, String categoryName, Set<Ads> ads) {
        this.id = id;
        this.categoryName = categoryName;
        this.ads = ads;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Set<Ads> getAds() {
        return ads;
    }

    public void setAds(Set<Ads> ads) {
        this.ads = ads;
    }
}
