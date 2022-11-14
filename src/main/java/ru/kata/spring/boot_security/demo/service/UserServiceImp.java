package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.UsersRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService, UserDetailsService {

    private final UsersRepository usersRepository;

    @Autowired
    public UserServiceImp(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }


    @Override
    public List<User> allUsers() {
        return usersRepository.findAll();
    }

    @Transactional
    @Override
    public User saveUser(User user) {
        if (user.getId() != 0) {
            User oldUser = getUser(user.getId());
            if (oldUser.getPassword().equals(user.getPassword()) || "".equals(user.getPassword())) {
                user.setPassword(oldUser.getPassword());
            }
        } else {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        }
        return usersRepository.save(user);
    }

    @Override
    public User getUser(int id) {
        User user = null;
        Optional<User> optional = usersRepository.findById(id);
        if (optional.isPresent()) {
            user = optional.get();
        }
        return user;
    }

    @Transactional
    @Override
    public void deleteUser(int id) {
        usersRepository.deleteById(id);
    }

    @Override
    public User findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        User user = null;
        try {
            user = usersRepository.findByEmail(email);
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
        }
        if (user == null) {
            throw new UsernameNotFoundException(String.format("Email '\s' not found in data base", email));
        }
        return user;
    }
}
