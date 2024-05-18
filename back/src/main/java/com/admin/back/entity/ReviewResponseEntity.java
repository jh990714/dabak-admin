package com.admin.back.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "review_response")
@Getter @Setter
public class ReviewResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id")
    private int responseId;

    @Column(name = "admin_id")
    private int adminId;

    @Column(name = "response_text")
    private String responseText;

    @Column(name = "response_date")
    private Date responseDate;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private ReviewEntity review;

    // Getters and Setters
}
