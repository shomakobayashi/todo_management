package com.dev_training.service;

import com.dev_training.entity.Account;
import com.dev_training.entity.AccountRepository;
import com.dev_training.entity.Enquiry;
import com.dev_training.entity.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 問い合わせ登録サービス。
 */
@Service
public class EnquiryRegisterService {

    /** 問い合わせリポジトリ */
    private final EnquiryRepository enquiryRepository;

    @Autowired
    public EnquiryRegisterService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    /**
     * 登録処理。
     *
     * @param enquiry    登録対象の問い合わせ
     */
    @Transactional
    public void register(Enquiry enquiry) {
        enquiryRepository.save(enquiry);
    }
}
