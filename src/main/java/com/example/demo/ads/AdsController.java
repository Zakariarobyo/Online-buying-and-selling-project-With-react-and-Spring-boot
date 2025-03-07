package com.example.demo.ads;

import com.example.demo.category.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/ads")
@CrossOrigin("*")
public class AdsController {

    @Autowired
    private AdsService adsService;

    @PostMapping
    public Ads createAds(@RequestBody Ads ads) {
        System.out.println("Données reçues : " + ads);
        System.out.println("Image reçue : " + ads.getImage());
        return adsService.createAds(ads);
    }

    @GetMapping
    public List<Ads> getAllAds() {
        return adsService.getAllAds();
    }

    @GetMapping("/{id}")
    public Ads getAds(@PathVariable String id) {
        return adsService.getAds(id);
    }

    @PutMapping("/{id}")
    public void updateAds(@PathVariable String id, @RequestBody Ads ads) {
        adsService.updateAds(id, ads);
    }

    @DeleteMapping("/{id}")
    public void deleteAds(@PathVariable String id) {
        adsService.deleteAds(id);
    }

    @GetMapping("/search/{keyword}")
    public List<Ads> getAdsByName(@PathVariable String keyword) {
        return adsService.getAdsByName(keyword);
    }
}