package com.example.demo.ads;

import com.example.demo.category.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdsService {

    @Autowired
    private AdsRepository adsRepository;

    public Ads createAds(Ads ads) {
        return adsRepository.save(ads);
    }

    public List<Ads> getAllAds() {
        return adsRepository.findAll();
    }

    public Ads getAds(String id) {
        Long userId = Long.parseLong(id);
        return adsRepository.findById(userId).orElse(null);
    }

    public void updateAds(String id, Ads data) {
        Long updateAds = Long.parseLong(id);
        Ads ads = adsRepository.findById(updateAds).orElse(null);

        if(ads != null){
            ads.setTitle(data.getTitle());
            ads.setDescription(data.getDescription());
            ads.setImage(data.getImage());
            ads.setLocation(data.getLocation());
            adsRepository.save(ads);
        }
    }

    public void deleteAds(String id) {
        Long deleteId = Long.parseLong(id);
        adsRepository.deleteById(deleteId);
    }

    public List<Ads> getAdsByName(String keyword) {

        return adsRepository.search(keyword);
    }

}
