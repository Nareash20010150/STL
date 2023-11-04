package com.restapi.service.service;

import com.restapi.service.entity.CustomerService;
import com.restapi.service.entity.NetService;
import com.restapi.service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceManagementService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<NetService> viewAllServices() {
        return serviceRepository.findAll();
    }
}
