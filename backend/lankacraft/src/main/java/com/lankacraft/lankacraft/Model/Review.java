package com.lankacraft.lankacraft.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long review_id;

    private  String review;

    @ManyToOne
    @JoinColumn(name = "fk_product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    private LocalDateTime createdAt;







}
