package com.restapi.service.service;

import com.restapi.service.entity.CustomerService;
import com.restapi.service.entity.NetService;
import com.restapi.service.repository.CustomerServiceRepository;
import com.restapi.service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceService {
    @Autowired
    private CustomerServiceRepository customerServiceRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    public void enableService(Integer userid, Integer serviceid) {
        Object status = customerServiceRepository.existsByServiceid(serviceid);
        if(!status.equals(true)){
            NetService netService = serviceRepository.findById(serviceid).get();
            CustomerService customerService = new CustomerService();
            customerService.setCustomerid(userid);
            customerService.setStatus("enable");
            customerService.setService(netService);

            customerServiceRepository.save(customerService);
        }else{
            CustomerService customerService = customerServiceRepository.findByCustomeridAndServiceid(userid,serviceid);
            customerService.setStatus("enable");
            customerServiceRepository.save(customerService);
        }
    }

    public void disableService(Integer userid, Integer serviceid) {
        CustomerService customerService = customerServiceRepository.findByCustomeridAndServiceid(userid,serviceid);
        customerService.setStatus("disable");
        customerServiceRepository.save(customerService);
    }
}
