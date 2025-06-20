package com.examportal.Services;

import com.examportal.Entities.UserRole;
import java.util.Set;
import com.examportal.Entities.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public User createUser(User user, Set<UserRole> roles) throws Exception;
}
