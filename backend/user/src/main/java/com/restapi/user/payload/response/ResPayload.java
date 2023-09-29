package com.restapi.user.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResPayload {
    private Object payload;
    private String message;
    private ResType type;

    public ResPayload(String message, ResType type) {
        this.message = message;
        this.type = type;
    }
}
