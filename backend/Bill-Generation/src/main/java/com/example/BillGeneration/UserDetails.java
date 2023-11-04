package com.example.BillGeneration;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class UserDetails {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Integer id;
}
