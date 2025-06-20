package com.examportal.Repositories;

import com.examportal.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByUsername(String username);
    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);
    public User getUserByEmail(String email);
}
