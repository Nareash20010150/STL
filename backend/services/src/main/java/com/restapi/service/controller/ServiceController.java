package com.restapi.service.controller;

import com.restapi.service.DTO.ServicesDTO;
import com.restapi.service.entity.CustomerService;
import com.restapi.service.entity.NetService;
import com.restapi.service.service.CustomerServiceService;
import com.restapi.service.service.ServiceManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private ServiceManagementService serviceManagementService;
    @Autowired
    private CustomerServiceService customerServiceService;

    @GetMapping("/viewAllServices")
    public Iterable<NetService> viewAllServices() {
        return serviceManagementService.viewAllServices();
    }

    @GetMapping("/viewMyServices/{userid}")
    public List<ServicesDTO> viewMyServices(@PathVariable("userid") Integer userid) {
        List<NetService> netServiceList = serviceManagementService.viewAllServices();
        List<CustomerService> customerServiceList = customerServiceService.viewMyServices(userid);

        List<Integer> subscribedServiceIds = customerServiceList.stream()
                .map(customerService -> customerService.getService().getId())
                .collect(Collectors.toList());

        return netServiceList.stream()
                .map(netService -> {
                    String status = subscribedServiceIds.contains(netService.getId()) ? customerServiceService.getStatusByNetServiceID(userid, netService.getId()) : "Inactive";
                    return new ServicesDTO(netService.getId(), netService.getName(), netService.getCategeroy(), netService.getCharge(), status, netService.getTechnology().getName());
                })
                .collect(Collectors.toList());
    }


    @PutMapping("/enable/{userid}/{serviceid}")
    public Void enableService(@PathVariable("userid") Integer userid, @PathVariable("serviceid") Integer serviceid) {
        customerServiceService.enableService(userid, serviceid);
        return null;
    }

    @PutMapping("/disable/{userid}/{serviceid}")
    public Void disableService(@PathVariable("userid") Integer userid, @PathVariable("serviceid") Integer serviceid) {
        customerServiceService.disableService(userid, serviceid);
        return null;
    }

}
