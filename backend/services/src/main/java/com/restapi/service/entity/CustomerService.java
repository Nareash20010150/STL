package com.restapi.service.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "customerservice", schema = "public")
@Getter
@Setter
@NoArgsConstructor

public class CustomerService {
    @Id
    @SequenceGenerator(name = "customer_id_sequence", sequenceName = "customer_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_id_sequence")
    private Integer id;

    private Integer customerid;

    private String status;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    private NetService service;

    //Setters
    public void setCustomerid(Integer customerid) {
        this.customerid = customerid;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setService(NetService service) {
        this.service = service;
    }

}
