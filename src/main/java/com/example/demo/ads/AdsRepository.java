package com.example.demo.ads;

import com.example.demo.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdsRepository extends JpaRepository<Ads, Long> {

    @Query("SELECT a FROM Ads a WHERE CONCAT(a.description, ' ', a.title) LIKE %?1%")
    List<Ads> search(String keyword);

}
