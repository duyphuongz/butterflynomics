package com.butterflynomics.application.auth.login;

//Command ta hiểu nó như một object mang dữ liệu 
//Nó chỉ là thuật ngữ khác 
//Giống như Controller có request thì tầng Application có Command
public record LoginCommand(String email, String password) {
    public String toString() {
        return "LoginCommand[email=" + email + "]";
    }
}
