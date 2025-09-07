package com.lankacraft.lankacraft.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private  String jwt;
    private Long user_id;
    private String role;
    private String firstname;
    private String lastname;
    private String email;
    private  String message;



}
