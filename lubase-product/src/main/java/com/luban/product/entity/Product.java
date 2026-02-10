package com.luban.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code", length = 50)
    private String productCode;  // 产品编号

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(name = "category", length = 100)
    private String category;  // 产品分类

    @Column(length = 50)
    private String status;  // 状态：已发布/测试中/开发中

    @Column(name = "responsible_person", length = 100)
    private String responsiblePerson;  // 负责人

    @Column(length = 50)
    private String version;  // 版本号

    @Column(name = "release_date")
    private LocalDateTime releaseDate;  // 发布日期

    @Column(name = "feature_description", length = 500)
    private String featureDescription;  // 功能描述

    @Column(length = 50)
    private String authorization;  // 授权状态：已授权/未授权

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
