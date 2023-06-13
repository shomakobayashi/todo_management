package com.dev_training.controller;

import com.dev_training.entity.Account;
import com.dev_training.entity.Enquiry;
import com.dev_training.form.AccountRegisterForm;
import com.dev_training.form.EnquiryRegisterForm;
import com.dev_training.service.AccountRegisterService;
import com.dev_training.service.EnquiryRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 問い合わせ登録コントローラ。
 */
@Controller
@RequestMapping(value = "/enquiry/register")
public class EnquiryRegisterController {

  /**
   * 問い合わせ
   */
    private final EnquiryRegisterService service;

    @Autowired
    public EnquiryRegisterController(EnquiryRegisterService enquiryRegisterService) {
        this.service = enquiryRegisterService;
    }

    /**
     * 問い合わせ登録-初期表示。
     *
     * @param enquiryRegisterForm 登録フォーム問い合わせ
     * @return Path
     */
    @RequestMapping(value = "/init")
    String registerInit(@ModelAttribute EnquiryRegisterForm enquiryRegisterForm) {
        return "enquiry/enquiryRegisterForm";
    }
/*

    */
/**
     * 問い合わせ登録-確認画面表示。
     *
     * @param enquiryRegisterForm 問い合わせフォーム
     * @param bindingResult       問い合わせ結果
     * @param model               モデル
     * @return Path
     */

    @RequestMapping(value = "/confirm", method = RequestMethod.POST)
    String registerConfirm(@ModelAttribute @Validated EnquiryRegisterForm enquiryRegisterForm, BindingResult bindingResult, Model model) {
        // BeanValidationのエラー確認
        if (bindingResult.hasErrors()) {
            return "enquiry/enquiryRegisterForm";
        }
        return "enquiry/enquiryRegisterConfirmForm";
    }

/**
     * 問い合わせ登録-完了画面表示。
     *
     * @param enquiryRegisterForm 精査済みフォーム
     * @param bindingResult       精査結果
     * @return Path
     */

    @RequestMapping(value = "/do", params = "register", method = RequestMethod.POST)
    String registerComplete(@ModelAttribute @Validated EnquiryRegisterForm enquiryRegisterForm, BindingResult bindingResult) {
        // BeanValidationのエラー確認
        if (bindingResult.hasErrors()) {
            return "enquiry/enquiryRegisterForm";
        }
        // 登録する問い合わせの作成
        Enquiry enquiry = new Enquiry();
        enquiry.setTitle(enquiryRegisterForm.getTitle());
        enquiry.setName(enquiryRegisterForm.getName());
        enquiry.setEmail(enquiryRegisterForm.getEmail());
        enquiry.setDetail(enquiryRegisterForm.getDetail());
        // 問い合わせの登録
        service.register(enquiry);
        return "enquiry/enquiryRegisterCompleteForm";
    }

/**
     * 問い合わせ登録-入力画面に戻る。
     *
     * @param enquiryRegisterForm 問い合わせ登録フォーム。
     * @return Path
     */
    //params=の中身はenquiRegisterFormで戻るを押すと下のメソッドが実行される
    @RequestMapping(value = "/do", params = "registerBack", method = RequestMethod.POST)
    String registerBack(@ModelAttribute EnquiryRegisterForm enquiryRegisterForm) {
        return "enquiry/enquiryRegisterForm";
    }


}
