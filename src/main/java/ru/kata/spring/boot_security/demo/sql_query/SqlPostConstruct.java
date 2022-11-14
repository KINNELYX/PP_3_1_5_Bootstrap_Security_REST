package ru.kata.spring.boot_security.demo.sql_query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UsersRepository;


import javax.annotation.PostConstruct;

import java.util.Collections;

import java.util.LinkedHashSet;
import java.util.Set;

@Component
public class SqlPostConstruct {

    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public SqlPostConstruct(UsersRepository usersRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void saveSqlUsers() {

        Set<Role> roleSet = new LinkedHashSet<>();
        Role roleAdmin = new Role(1, "ROLE_ADMIN");
        Role roleUser = new Role(2, "ROLE_USER");
        roleSet.add(roleAdmin);
        roleSet.add(roleUser);
        roleRepository.save(roleAdmin);
        roleRepository.save(roleUser);
        User user = new User("Alex", "Avlichev", "alex@mail.ru",
                29, passwordEncoder.encode("user"), true, roleSet);
        User user2 = new User("Maxim", "Gavrilov", "max@mail.ru",
                20, passwordEncoder.encode("user"), true, Collections.singleton(roleUser));
        usersRepository.save(user);
        usersRepository.save(user2);
        User user3 = new User("Oleg", "Miami", "miami@mail.ru",
                30, passwordEncoder.encode("user"), true, Collections.singleton(roleUser));
        usersRepository.save(user3);
        User user4 = new User("Bruce", "Wayne", "batman@mail.ru",
                35, passwordEncoder.encode("user"), true, Collections.singleton(roleUser));
        usersRepository.save(user4);
        User user5 = new User("Barry", "Allen", "flash@mail.ru",
                24, passwordEncoder.encode("user"), true, Collections.singleton(roleUser));
        usersRepository.save(user5);
        User user6 = new User("Piter", "Parker", "spider@mail.ru",
                17, passwordEncoder.encode("user"), true, Collections.singleton(roleUser));
        usersRepository.save(user6);
    }
    //**********************************************************************
    //                             вход по username
    //
    //                         ADMIN username     password
    //                          alex@mail.ru        user
    //
    //                         USERS username     password
    //                          max@mail.ru         user
    //                          miami@mail.ru
    //                          batman@mail.ru
    //                          flash@mail.ru
    //                          spider@mail.ru
    //**************************************************************************
}
