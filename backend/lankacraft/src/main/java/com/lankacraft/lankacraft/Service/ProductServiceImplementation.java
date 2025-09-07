package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Category;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Repository.CategoryRepo;
import com.lankacraft.lankacraft.Repository.ProductRepo;
import com.lankacraft.lankacraft.Request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImplementation implements ProductService{
private ProductRepo productRepo;
private UserService userService;
private CategoryRepo categoryRepo;

public ProductServiceImplementation(ProductRepo productRepo,UserService userService,CategoryRepo categoryRepo){
    this.productRepo=productRepo;
    this.userService=userService;
    this.categoryRepo=categoryRepo;
}


    @Override
    public Product createProduct(CreateProductRequest req) {

        Category topLevel=categoryRepo.findByName(req.getTopLevelCategory());

        if (topLevel==null){
            Category topLevelCategory= new Category();
            topLevelCategory.setName(req.getTopLevelCategory());
            topLevelCategory.setLevel(1);

            topLevel=categoryRepo.save(topLevelCategory);
        }

        Category secondLevel=categoryRepo.
                findByNameAndParent(req.getSecondLevelCategory(),topLevel.getName());

        if (secondLevel==null){
            Category secondLevelCategory= new Category();
            secondLevelCategory.setName(req.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(2);

            secondLevel=categoryRepo.save(secondLevelCategory);
        }


        Category thirdLevel=categoryRepo.
                findByNameAndParent(req.getThirdLevelCategory(),secondLevel.getName());

        if (thirdLevel==null){
            Category thirdLevelCategory= new Category();
            thirdLevelCategory.setName(req.getThirdLevelCategory());
            thirdLevelCategory.setParentCategory(secondLevel);
            thirdLevelCategory.setLevel(3);

            thirdLevel=categoryRepo.save(thirdLevelCategory);
        }


        Product product=new Product();
        product.setTitle(req.getTitle());
        product.setArtisanEmail(req.getArtisanEmail());
        product.setDescription(req.getDescription());
        product.setDiscountPrice(req.getDiscountedPrice());
        product.setDiscountPresent(req.getDiscountPresent());
        product.setImageUrl(req.getImageUrl());
        product.setBrand(req.getBrand());
        product.setPrice(req.getPrice());
        product.setQuantity(req.getQuantity());
        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());

        Product savedProduct=productRepo.save(product);

        return savedProduct;
    }

    @Override
    public String deleteProduct(Long product_id) throws ProductExpection {

    Product product=findProductById(product_id);
    productRepo.delete(product);
        return "Product Deleted Successfully";
    }

    @Override
    public Product updateProduct(Long product_id, Product req) throws ProductExpection {
        Product product=findProductById(product_id);

        if (req.getQuantity()!=0){
            product.setQuantity(req.getQuantity());
        }

        return productRepo.save(product);
    }

    @Override
    public Product findProductById(Long product_id) throws ProductExpection {
        Optional<Product>opt=productRepo.findById(product_id);

        if (opt.isPresent()){
            return  opt.get();
        }
        throw new ProductExpection("Product Not Found with id"+ product_id);



    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return List.of();
    }

    @Override
    public List<Product> findAllProduct() {
        return productRepo.findAll();
    }

    @Override
    public Page<Product> getAllProduct(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {

        Pageable pageable= PageRequest.of(pageNumber,pageSize);

        List<Product>products=productRepo.filterProducts(category,minPrice,maxPrice,minDiscount,sort);

        if (stock!=null){
            if (stock.equals("in_stock")){
                products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
            } else if (stock.equals("out_of_stock")) {
                products=products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());

            }
        }


        int startIndex=(int) pageable.getOffset();
        int endIndex=Math.min(startIndex + pageable.getPageSize(),products.size());

        List<Product>pageContent=products.subList(startIndex,endIndex);

        Page<Product> filteredProducts=new PageImpl<>(pageContent,pageable,products.size());
        return filteredProducts;
    }

    @Override
    public List<Product> findByArtisanEmail(String artisanEmail) throws ProductExpection {
        List<Product> products = productRepo.findByArtisanEmail(artisanEmail);

        if (products == null || products.isEmpty()) {
            throw new ProductExpection("No products found for artisanEmail: " + artisanEmail);
        }

        return products;
    }




}
