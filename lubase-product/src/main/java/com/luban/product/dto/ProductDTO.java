package com.luban.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String productCode;  // 产品编号
    private String name;
    private String description;
    private String category;  // 产品分类
    private String status;  // 状态：已发布/测试中/开发中
    private String responsiblePerson;  // 负责人
    private String version;  // 版本号
    private LocalDateTime releaseDate;  // 发布日期
    private String featureDescription;  // 功能描述
    private String authorization;  // 授权状态：已授权/未授权
    private BigDecimal price;
}
