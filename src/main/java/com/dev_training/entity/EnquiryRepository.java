package com.dev_training.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * 問い合わせリポジトリ。
 */
public interface EnquiryRepository extends JpaRepository<Enquiry, Integer>, JpaSpecificationExecutor<Enquiry> {
}