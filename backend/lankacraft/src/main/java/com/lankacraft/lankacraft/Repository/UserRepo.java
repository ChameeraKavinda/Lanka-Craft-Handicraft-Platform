package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    public User findByEmail(String email);



}


