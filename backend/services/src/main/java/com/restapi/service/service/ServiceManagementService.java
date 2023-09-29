package com.restapi.service.service;

import com.restapi.service.entity.NetService;
import com.restapi.service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceManagementService {

    @Autowired
    ServiceRepository serviceRepository;
    public String createService(NetService netService) {
        serviceRepository.save(netService);
        return "Service created";
    }

    public void enableService(NetService netService) {
        NetService.setStatus("enable");
        serviceRepository.save(netService);
    }
}
