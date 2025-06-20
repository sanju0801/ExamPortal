package com.examportal.Services.Impl;

import com.examportal.Entities.User;
import com.examportal.Entities.UserRole;
import com.examportal.Repositories.RoleRepository;
import com.examportal.Repositories.UserRepository;
import com.examportal.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> roles) throws Exception {
        User lcoalUser = this.userRepository.findByUsername(user.getUsername());
        if(lcoalUser != null) {
            throw new Exception("User already present");
        } else {
            for (UserRole role : roles) {
                roleRepository.save(role.getRole());
            }
            user.getRoles().addAll(roles);
            return this.userRepository.save(user);
        }
    }
}
