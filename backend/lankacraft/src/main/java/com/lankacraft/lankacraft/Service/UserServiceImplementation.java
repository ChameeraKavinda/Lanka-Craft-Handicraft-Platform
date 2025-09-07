package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Repository.UserRepo;
import com.lankacraft.lankacraft.config.JwtProvider;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{

    private UserRepo userRepo;

    private JwtProvider jwtProvider;

    public UserServiceImplementation(UserRepo userRepo,JwtProvider jwtProvider){
        this.userRepo=userRepo;
        this.jwtProvider=jwtProvider;

    }
    @Override
    public User findUserById(Long user_id) throws UserException {
        Optional<User> user=userRepo.findById(user_id);

        if (user.isPresent()){
            return  user.get();
        }
        throw  new UserException("user not found with id:"+ user_id);
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {

        String email=jwtProvider.getEmailFromToken(jwt);

        User user=userRepo.findByEmail(email);

        if (user==null){
            throw  new UserException("user not found with email:"+ email);
        }
        return user;
    }
}
