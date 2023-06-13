package com.dev_training.form;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * 問い合わせ登録フォーム。
 */
public class EnquiryRegisterForm implements Serializable {

    @NotBlank
    @Size(max = 45, message = "{error.size.max}")
    private String title;
    @NotBlank
    @Size(max = 255, message = "{error.size.max}")
    private String name;
    @NotBlank
    @Size(max = 45, message = "{error.size.max}")
    @Email
    private String email;
    @NotBlank
    @Size(max = 255, message = "{error.size.max}")
    private String detail;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}

