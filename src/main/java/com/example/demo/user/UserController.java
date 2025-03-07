package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody Form form){
        return userService.createUser(form);
    }

    @GetMapping
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable String id){
        return userService.getUser(id);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable String id, @RequestBody User user){

        userService.updateUser(id, user);
    }

    @PutMapping("edit/name/{id}")
    public void updateUserName(@PathVariable String id, @RequestBody User user){
        userService.updateUserName(id, user);
    }

    @PutMapping("edit/password/{id}")
    public void updateUserPassword(@PathVariable String id, @RequestBody User user){
        userService.updateUserPassword(id, user);
    }

    @PutMapping("edit/phone/{id}")
    public void updateUserPhone(@PathVariable String id, @RequestBody User user){
        userService.updateUserPhone(id, user);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){
        userService.deleteUser(id);
    }
}
class Form {
    private User user;
    private Long role_id;

    public User getUser() {
        return user;
    }

    public Long getRole_id() {
        return role_id;
    }
}