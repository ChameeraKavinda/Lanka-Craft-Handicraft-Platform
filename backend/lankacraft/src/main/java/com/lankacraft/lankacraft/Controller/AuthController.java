package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Repository.UserRepo;
import com.lankacraft.lankacraft.Request.LoginRequest;
import com.lankacraft.lankacraft.Response.AuthResponse;
import com.lankacraft.lankacraft.Service.CartService;
import com.lankacraft.lankacraft.Service.CustomUserServiceImplementation;
import com.lankacraft.lankacraft.config.JwtProvider;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Data
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    private JwtProvider jwtProvider;

    private  UserRepo userRepo;

    private PasswordEncoder passwordEncoder;

    private CustomUserServiceImplementation customUserService;

    private CartService cartService;


    public AuthController(UserRepo userRepo,CustomUserServiceImplementation customUserService,PasswordEncoder passwordEncoder,JwtProvider jwtProvider,CartService cartService){

        this.userRepo=userRepo;
        this.customUserService=customUserService;
        this.passwordEncoder=passwordEncoder;
        this.jwtProvider=jwtProvider;
        this.cartService=cartService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> CreateUserHandler(@RequestBody User user) throws UserException {

        // Manual validation
        if (user.getFirstname() == null || user.getFirstname().trim().isEmpty()) {
            throw new UserException("First name is required");
        }
        if (user.getLastname() == null || user.getLastname().trim().isEmpty()) {
            throw new UserException("Last name is required");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new UserException("Email is required");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new UserException("Password is required");
        }
        if (user.getMobile() == null || user.getMobile().trim().isEmpty()) {
            throw new UserException("Mobile number is required");
        }

        // Email duplicate check
        User isEmailExist = userRepo.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            throw new UserException("Email is already used with another account");
        }

        // User create
        User createUser = new User();
        createUser.setFirstname(user.getFirstname());
        createUser.setLastname(user.getLastname());
        createUser.setEmail(user.getEmail());
        createUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createUser.setMobile(user.getMobile());
        createUser.setRole(user.getRole());
        createUser.setUser_id(user.getUser_id());

        User savedUser = userRepo.save(createUser);
        Cart cart = cartService.createCart(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setFirstname(savedUser.getFirstname());
        authResponse.setLastname(savedUser.getLastname());
        authResponse.setEmail(savedUser.getEmail());
        authResponse.setRole(savedUser.getRole());
        authResponse.setUser_id(savedUser.getUser_id());
        authResponse.setMessage("Signup Success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse>LoginUserHandler(@RequestBody LoginRequest loginRequest){

        String username=loginRequest.getEmail();

        String password=loginRequest.getPassword();

        Authentication authentication=authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);


        String token= jwtProvider.generateToken(authentication);
        User byEmail = userRepo.findByEmail(username);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setUser_id(byEmail.getUser_id());
        authResponse.setRole(byEmail.getRole());
        authResponse.setFirstname(byEmail.getFirstname());
        authResponse.setLastname(byEmail.getLastname());
        authResponse.setEmail(byEmail.getEmail());

        authResponse.setMessage("Signin Success");


        return  new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails=customUserService.loadUserByUsername(username);

        if (userDetails==null){
            throw  new BadCredentialsException("Invalid User Name");
        }

        if (!passwordEncoder.matches(password,userDetails.getPassword())){
            throw  new BadCredentialsException("Invalid Password...");


        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }




    @PutMapping("/update/{id}")
    public ResponseEntity<AuthResponse> UpdateUserHandler(@PathVariable Long id, @RequestBody User user) throws UserException {


        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new UserException("User not found with id: " + id));


        if (user.getFirstname() != null && !user.getFirstname().trim().isEmpty()) {
            existingUser.setFirstname(user.getFirstname());
        }
        if (user.getLastname() != null && !user.getLastname().trim().isEmpty()) {
            existingUser.setLastname(user.getLastname());
        }
        if (user.getEmail() != null && !user.getEmail().trim().isEmpty()) {
            // Check if email already taken by another user
            User emailOwner = userRepo.findByEmail(user.getEmail());
            if (emailOwner != null && !emailOwner.getUser_id().equals(existingUser.getUser_id())) {
                throw new UserException("Email is already used by another account");
            }
            existingUser.setEmail(user.getEmail());
        }
        if (user.getMobile() != null && !user.getMobile().trim().isEmpty()) {
            existingUser.setMobile(user.getMobile());
        }

        // Save updated user
        User savedUser = userRepo.save(existingUser);

        // Build response
        AuthResponse authResponse = new AuthResponse();
        authResponse.setUser_id(savedUser.getUser_id());
        authResponse.setFirstname(savedUser.getFirstname());
        authResponse.setLastname(savedUser.getLastname());
        authResponse.setEmail(savedUser.getEmail());
        authResponse.setRole(savedUser.getRole());
        authResponse.setMessage("Update Success");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }



    @GetMapping("/getallusers")
    public ResponseEntity<List<AuthResponse>> getAllUsers(){
        List<User> all = userRepo.findAll();


        List<AuthResponse> authResponse=new ArrayList<>();
        for (User user : all) {
            AuthResponse getallauthResponse=new AuthResponse();
            getallauthResponse.setEmail(user.getEmail());
            getallauthResponse.setUser_id(user.getUser_id());
            getallauthResponse.setFirstname(user.getFirstname());
            getallauthResponse.setRole(user.getRole());

            authResponse.add(getallauthResponse);

        }


        return new ResponseEntity<List<AuthResponse>>(authResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AuthResponse> deleteUser(@PathVariable Long id) {
        AuthResponse authResponse = new AuthResponse();

        try {
            // Check if user exists
            User existingUser = userRepo.findById(id)
                    .orElseThrow(() -> new UserException("User not found with id: " + id));

            // Delete user
            userRepo.delete(existingUser);

            // Build success response
            authResponse.setUser_id(id);
            authResponse.setMessage("User deleted successfully");

            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        } catch (UserException e) {
            // Build fail response
            authResponse.setMessage("Delete Failed: " + e.getMessage());
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            authResponse.setMessage("Delete Failed: Unexpected error");
            return new ResponseEntity<>(authResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
