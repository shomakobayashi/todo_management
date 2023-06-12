package com.dev_training.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ログインコントローラ。
 */
@Controller
@RequestMapping("/login")
public class LoginController {
    @RequestMapping("")
    public String login() {

        return "/login/loginForm";
    }
    //Todo TechAdv todoSecurity アプリ紹介ページを表示するためのメソッドに追加する。
    // ・アプリ紹介ページは、[login/introduction.html]を新規に作成してください。
    /**
     *  todo紹介
     *
     * @return Path
     * */
    @RequestMapping(value ="/introduction")
    public String introduction(){
        return "/login/introduction";
    }
}
