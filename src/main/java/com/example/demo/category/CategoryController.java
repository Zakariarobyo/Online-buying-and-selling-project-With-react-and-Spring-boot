package com.example.demo.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public Category createCategory(@RequestBody Category category){
        return categoryService.createUser(category);
    }

    @GetMapping
    public List<Category> getAllCategory(){
        return categoryService.getAllCategory();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable String id){
        return categoryService.getCategory(id);
    }

    @GetMapping("/byName/{name}")
    public List<Category> getCategoryByName(@PathVariable String name){
        return categoryService.getCategoryByName(name);
    }


    @PutMapping("/{id}")
    public void updateCategory(@PathVariable String id, @RequestBody Category category){
        categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
    }
}
