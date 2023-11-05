package com.restapi.service.controller;

import com.restapi.service.DTO.CustomerServiceDTO;
import com.restapi.service.DTO.ServicesDTO;
import com.restapi.service.entity.CustomerService;
import com.restapi.service.entity.NetService;
import com.restapi.service.service.CustomerServiceService;
import com.restapi.service.service.ServiceManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/service")
public class SupportController {
    @Autowired
    private ServiceManagementService serviceManagementService;
    @Autowired
    private CustomerServiceService customerServiceService;

    @GetMapping("/customer/{userid}")
    public List<CustomerServiceDTO> viewMyServices(@PathVariable("userid") Integer userid) {
        List<NetService> netServiceList = serviceManagementService.viewAllServices();
        List<CustomerService> customerServiceList = customerServiceService.viewMyServices(userid);
        List<CustomerServiceDTO> customerServicesDTOList = new ArrayList<>();

        for (CustomerService customerService : customerServiceList) {
            CustomerServiceDTO customerServiceDTO = new CustomerServiceDTO(customerService.getCustomerid(), customerService.getService());
            customerServicesDTOList.add(customerServiceDTO);
        }

        return customerServicesDTOList;
    }

}
