package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    public Product createProduct(CreateProductRequest req);
    public String deleteProduct(Long product_id) throws ProductExpection;

    public  Product updateProduct(Long product_id,Product req)throws  ProductExpection;

    public Product findProductById(Long product_id) throws ProductExpection;

    public List<Product> findProductByCategory(String category);

    public List<Product>findAllProduct();

    public Page<Product> getAllProduct(String category,Integer minPrice,Integer maxPrice,
                                       Integer minDiscount,String sort,String stock,Integer pageNumber,Integer pageSize);


    public List <Product> findByArtisanEmail(String artisanEmail) throws ProductExpection;
}
