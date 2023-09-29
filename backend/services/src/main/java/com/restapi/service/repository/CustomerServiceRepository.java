package com.restapi.service.repository;

import com.restapi.service.entity.CustomerService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerServiceRepository extends JpaRepository<CustomerService, Integer>{

}
