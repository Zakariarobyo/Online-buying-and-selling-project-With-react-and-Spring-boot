package com.example.demo.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class UserRepoTest {

//    private final UserRepository userRepository;
//
//    @Autowired
//    public UserRepoTest(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Test
//    void itShouldFindUser() {
//        User user = new User("abdullah", "055555");
//
//        User savedUser = userRepository.save(user);
//
//        User result = userRepository.findById(savedUser.getId()).orElse(null);
//
//        assertNotNull(result);
//    }
//
//    @Test
//    void itShouldSaveUser() {
//
//        User user = new User("abdullah", "055555");
//
//        User result = userRepository.save(user);
//
//        assertTrue(result.getId() != null);
//    }
//
//    @Test
//    void itShouldFindUserByEmail() {
//        String phone = "05555555";
//        User user = new User("abdullah", "055555");
//        userRepository.save(user);
//
//        User result = userRepository.findByPhone(phone);
//
//        assertEquals(phone, result.getPhone());
//        assertNotEquals("05555555", result.getPhone());
//
//    }
}
