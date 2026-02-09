package com.luban.product.controller;

import com.luban.product.dto.ProductDTO;
import com.luban.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 浏览产品列表 - 需要角色 USER
    @GetMapping("/list")
    @PreAuthorize("hasAnyRole('USER', 'EDITOR', 'PRODUCT_ADMIN')")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // 获取单个产品 - 需要角色 USER
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'EDITOR', 'PRODUCT_ADMIN')")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    // 添加产品 - 需要角色 EDITOR 或 PRODUCT_ADMIN
    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('EDITOR', 'PRODUCT_ADMIN')")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.createProduct(productDTO));
    }

    // 修改产品 - 需要角色 EDITOR 或 PRODUCT_ADMIN
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('EDITOR', 'PRODUCT_ADMIN')")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        }
        return ResponseEntity.notFound().build();
    }

    // 删除产品 - 需要角色 EDITOR 或 PRODUCT_ADMIN
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('EDITOR', 'PRODUCT_ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.deleteProduct(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
