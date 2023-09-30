package com.restapi.service.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "networktechnology", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class NetTechnology {
    @Id
    private Integer id;
    private String name;

    public NetTechnology(String name) {
        this.name = name;
    }
}
