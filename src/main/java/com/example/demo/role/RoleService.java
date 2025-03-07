package com.example.demo.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    public Role getRole(String id) {
        Long RoleId =Long.parseLong(id);
        return roleRepository.findById(RoleId).orElse(null);
    }

    public void updateRole(String id, Role data) {
        Long updateRole = Long.parseLong(id);
        Role role = roleRepository.findById(updateRole).orElse(null);

        if(role != null){
            role.setName(data.getName());
            roleRepository.save(role);
        }
    }

    public void deleteRole(String id) {
        Long deleteId = Long.parseLong(id);
        roleRepository.deleteById(deleteId);
    }
}
