package com.restapi.service.service;

import com.restapi.service.entity.NetService;
import com.restapi.service.repository.CustomerServiceRepository;
import com.restapi.service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerServiceRepository customerServiceRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    public void enableService(Integer userid, Integer serviceid) {
        NetService netService = serviceRepository.findById(serviceid).get();
        CustomerService customerService = customerServiceRepository.findById(userid).get();


    }
}
