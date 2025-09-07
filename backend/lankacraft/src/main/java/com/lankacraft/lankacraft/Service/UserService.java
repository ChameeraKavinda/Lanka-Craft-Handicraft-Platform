package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public User findUserById(Long user_id) throws UserException;

    public  User findUserProfileByJwt(String jwt) throws UserException;
}
