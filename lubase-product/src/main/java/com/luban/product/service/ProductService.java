package com.luban.product.service;

import com.luban.product.dto.ProductDTO;
import com.luban.product.entity.Product;
import com.luban.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        if (productRepository.existsById(id)) {
            Product product = convertToEntity(productDTO);
            product.setId(id);
            Product updatedProduct = productRepository.save(product);
            return convertToDTO(updatedProduct);
        }
        return null;
    }
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .productCode(product.getProductCode())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory())
                .status(product.getStatus())
                .responsiblePerson(product.getResponsiblePerson())
                .version(product.getVersion())
                .releaseDate(product.getReleaseDate())
                .featureDescription(product.getFeatureDescription())
                .authorization(product.getAuthorization())
                .price(product.getPrice())
                .build();
    }
    private Product convertToEntity(ProductDTO productDTO) {
        return Product.builder()
                .productCode(productDTO.getProductCode())
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .category(productDTO.getCategory())
                .status(productDTO.getStatus())
                .responsiblePerson(productDTO.getResponsiblePerson())
                .version(productDTO.getVersion())
                .releaseDate(productDTO.getReleaseDate())
                .featureDescription(productDTO.getFeatureDescription())
                .authorization(productDTO.getAuthorization())
                .price(productDTO.getPrice())
                .build();
    }
}
