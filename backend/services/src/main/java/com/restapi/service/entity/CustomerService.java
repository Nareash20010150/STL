package com.restapi.service.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Customer", schema = "public")
@Getter
@Setter
@NoArgsConstructor

public class CustomerService {
    @Id
    @SequenceGenerator(name = "customer_id_sequence", sequenceName = "customer_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_id_sequence")
    private Integer id;

    private Integer customerId;

    private String status;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    private NetService service;
}
