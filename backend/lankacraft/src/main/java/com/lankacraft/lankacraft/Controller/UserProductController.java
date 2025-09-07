package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,
                                                                      @RequestParam Integer minPrice,
                                                                      @RequestParam Integer maxPrice,
                                                                      @RequestParam Integer minDiscount,
                                                                      @RequestParam String sort,
                                                                      @RequestParam String stock,@RequestParam Integer pageNumber,
                                                                      @RequestParam Integer pageSize){

        Page<Product>res=productService.getAllProduct(
                category,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize
        );

        System.out.println("Complete Products");

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/products/id/{product_id}")
    public ResponseEntity<Product> findProductByHandler(@PathVariable Long product_id) throws ProductExpection
    {

        Product product=productService.findProductById(product_id);

        return new ResponseEntity<Product>(product,HttpStatus.ACCEPTED);
    }






}
