package com.example.demo.role;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "api/roles")
@CrossOrigin("*")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public Role createRole(@RequestBody Role role){
        return roleService.createRole(role);
    }

    @GetMapping
    public List<Role> getAllRole(){
        return roleService.getAllRole();
    }

    @GetMapping("/{id}")
    public Role getRole(@PathVariable String id){
        return roleService.getRole(id);
    }

    @PutMapping("/{id}")
    public void updateRole(@PathVariable String id, @RequestBody Role role){
        roleService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable String id){
        roleService.deleteRole(id);
    }

}
