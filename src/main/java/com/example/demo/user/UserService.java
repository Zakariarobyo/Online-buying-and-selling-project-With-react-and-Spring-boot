package com.example.demo.user;

import com.example.demo.role.Role;
import com.example.demo.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = userRepository.findByName(name);
        if (user == null) {
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), authorities);
    }

    public User createUser(Form form) {
        User user = form.getUser();
        Long role_id = form.getRole_id();
        Role role = roleRepository.findById(role_id).orElse(null);
        user.getRoles().add(role);

        // Hachage du mot de passe avant de sauvegarder
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User getUser(String id) {
        Long userId = Long.parseLong(id);
        return userRepository.findById(userId).orElse(null);
    }

    // Mise à jour de l'utilisateur avec hachage du mot de passe
    public void updateUser(String id, User data) {
        Long updateUser = Long.parseLong(id);
        User user = userRepository.findById(updateUser).orElse(null);

        if (user != null) {
            user.setName(data.getName());
            // Hachage du mot de passe avant la mise à jour
            if (data.getPassword() != null && !data.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(data.getPassword()));
            }
            user.setPhone(data.getPhone());
            userRepository.save(user);
        }
    }

    public void updateUserName(String id, User data) {
        Long updateUser = Long.parseLong(id);
        User user = userRepository.findById(updateUser).orElse(null);

        if (user != null) {
            user.setName(data.getName());
            userRepository.save(user);
        }
    }

    public void updateUserPassword(String id, User data) {
        Long updateUser = Long.parseLong(id);
        User user = userRepository.findById(updateUser).orElse(null);

        if (user != null) {
            // Hachage du mot de passe avant la mise à jour
            user.setPassword(passwordEncoder.encode(data.getPassword()));
            userRepository.save(user);
        }
    }

    public void updateUserPhone(String id, User data) {
        Long updateUser = Long.parseLong(id);
        User user = userRepository.findById(updateUser).orElse(null);

        if (user != null) {
            user.setPhone(data.getPhone());
            userRepository.save(user);
        }
    }

    public void deleteUser(String id) {
        Long deleteId = Long.parseLong(id);
        userRepository.deleteById(deleteId);
    }
}
