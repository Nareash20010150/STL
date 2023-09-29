package com.restapi.user.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqUserLogin {
    private String email;
    private String password;
}
