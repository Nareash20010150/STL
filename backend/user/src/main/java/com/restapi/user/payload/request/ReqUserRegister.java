package com.restapi.user.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqUserRegister {
    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private String password;
}
