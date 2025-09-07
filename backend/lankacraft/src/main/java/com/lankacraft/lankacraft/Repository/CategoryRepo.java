package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepo extends JpaRepository<Category, Long> {

    // find category by name
    Category findByName(String name);

    // find category by name and parent category name using JPQL
    @Query("SELECT c FROM Category c WHERE c.name = :name AND c.parentCategory.name = :parentCategoryName")
    Category findByNameAndParent(
            @Param("name") String name,
            @Param("parentCategoryName") String parentCategoryName
    );
}
