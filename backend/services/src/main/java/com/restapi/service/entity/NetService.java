package com.restapi.service.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "service", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class NetService {
    @Id
    @SequenceGenerator(name = "net_service_id_sequence", sequenceName = "net_service_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "net_service_id_sequence")
    private Integer id;

    private String name;
    private String categeroy;

    public NetService(String name, String categeroy) {
        this.name = name;
        this.categeroy = categeroy;
    }
}
