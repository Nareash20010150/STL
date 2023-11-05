package com.restapi.user.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "users", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @SequenceGenerator(name = "user_id_sequence", sequenceName = "user_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")
    private Integer id;

    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private String password;
    private String resetToken;

    public User(String username, String firstName, String lastName, String phone, String address, String email, String password, String resetToken) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.password = password;
        this.resetToken = resetToken;
    }
}
