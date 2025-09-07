package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Request.CreateProductRequest;
import com.lankacraft.lankacraft.Response.ApiResponse;
import com.lankacraft.lankacraft.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    private ProductService productService;


    @PostMapping("/")
    public ResponseEntity<Product>createProduct(@RequestBody CreateProductRequest req){

        Product product=productService.createProduct(req);

        return new ResponseEntity<Product>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{product_id}/delete")
    public ResponseEntity<ApiResponse>deleteProduct(@PathVariable Long product_id)throws ProductExpection{

        productService.deleteProduct(product_id);
        ApiResponse res= new ApiResponse();
        res.setMessage("Product deleted Success");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> findAllProduct(){
        List<Product> products=productService.findAllProduct();

        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @PutMapping("/{product_id}/update")
    public ResponseEntity<Product>updateProduct(@RequestBody Product req,@PathVariable Long product_id)throws ProductExpection{
        Product product=productService.updateProduct(product_id,req);
        return new ResponseEntity<Product>(product,HttpStatus.CREATED);
    }

    @PostMapping("/creates")
    public ResponseEntity<ApiResponse>createMultipleProduct(@RequestBody CreateProductRequest[]req){
        for (CreateProductRequest product:req){
            productService.createProduct(product);

        }
        ApiResponse res=new ApiResponse();
        res.setMessage("product Created Success");
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }
    @GetMapping("/{artisanEmail}")
    public ResponseEntity<List<Product>> findProductsByArtisanEmail(@PathVariable String artisanEmail) throws ProductExpection {
        List<Product> products = productService.findByArtisanEmail(artisanEmail);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }






}
