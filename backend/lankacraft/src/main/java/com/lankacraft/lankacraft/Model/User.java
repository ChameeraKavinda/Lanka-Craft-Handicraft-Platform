package com.lankacraft.lankacraft.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long user_id;


    private String firstname;
    private String lastname;

    private String email;

    private  String password;


    private  String role;

    private  String mobile;



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> address= new ArrayList<>();

    @Embedded
    @ElementCollection
    @CollectionTable(name="payment_information",joinColumns = @JoinColumn(name="fk_user_id"))
    private List<PaymentInformation> paymentInformation=new ArrayList<>();


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private  List<Rating> ratings=new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Review> reviews=new ArrayList<>();


    private LocalDateTime createdAt;




//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "fk_user_id",referencedColumnName = "user_id")
//    private List<Artisan> artisans;
//
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "fk_user_id",referencedColumnName = "user_id")
//    private List<Customer> customers;


}
