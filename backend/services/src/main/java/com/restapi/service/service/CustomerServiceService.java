package com.restapi.service.service;

import com.restapi.service.entity.CustomerService;
import com.restapi.service.entity.NetService;
import com.restapi.service.repository.CustomerServiceRepository;
import com.restapi.service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceService {
    @Autowired
    private CustomerServiceRepository customerServiceRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    public void enableService(Integer userid, Integer serviceid) {
        CustomerService customerSer = customerServiceRepository.findByCustomeridAndServiceid(userid,serviceid);
        if(customerSer==null){
            NetService netService = serviceRepository.findById(serviceid).get();
            CustomerService customerService = new CustomerService();
            customerService.setCustomerid(userid);
            customerService.setStatus("Active");
            customerService.setService(netService);

            customerServiceRepository.save(customerService);
        }else{
            CustomerService customerService = customerServiceRepository.findByCustomeridAndServiceid(userid,serviceid);
            customerService.setStatus("Active");
            customerServiceRepository.save(customerService);
        }
    }

    public void disableService(Integer userid, Integer serviceid) {
        CustomerService customerService = customerServiceRepository.findByCustomeridAndServiceid(userid,serviceid);
        customerService.setStatus("Inactive");
        customerServiceRepository.save(customerService);
    }

    public List<CustomerService> viewMyServices(Integer userid) {
        return customerServiceRepository.findByCustomerid(userid);
    }


    public String getStatusByNetServiceID(Integer userid, Integer netServiceID) {
        CustomerService customerServices = customerServiceRepository.findByCustomeridAndServiceId(userid, netServiceID);
        if (customerServices== null) {
            return "Inactive";
        } else {
            return customerServices.getStatus();
        }
    }

}
