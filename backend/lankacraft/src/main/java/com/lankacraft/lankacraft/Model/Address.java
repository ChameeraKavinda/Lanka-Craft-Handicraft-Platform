package com.lankacraft.lankacraft.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long address_id;

    @Column(name = "first_name")
    private  String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;


    @Column(name = "zip_code")
    private  String zipCode;


    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    @JsonIgnore
    private  User user;

    private String mobile;



}
