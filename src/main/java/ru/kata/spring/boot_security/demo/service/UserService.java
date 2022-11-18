package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> allUsers();

    User saveUser(User user);

    User getUser(int id);

    void deleteUser(int id);

    User findByEmail(String email);

    @Transactional
    void update(int id, User updatedUser);
}
