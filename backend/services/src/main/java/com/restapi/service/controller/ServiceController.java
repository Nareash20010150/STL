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

//    @GetMapping("/viewMyServices/{userid}")
//    public List<ServicesDTO> viewMyServices(@PathVariable("userid") Integer userid) {
//        List<NetService> netServiceList = serviceManagementService.viewAllServices();
//        List<CustomerService> customerServiceList = customerServiceService.viewMyServices(userid);
//        List<ServicesDTO> servicesDTOList = new ArrayList<>();
//
//        // Get all NetService IDs from CustomerService for the given user
//        List<Integer> subscribedServiceIds = new ArrayList<>();
//        for (CustomerService customerService : customerServiceList) {
//            subscribedServiceIds.add(customerService.getService().getId());
//        }
//
//        // Iterate through the netServiceList
//        for (NetService netService : netServiceList) {
//            // Set the status based on whether the NetService ID is subscribed or not
//            String status = subscribedServiceIds.contains(netService.getId()) ? customerServiceService.getStatusByNetServiceID(userid,netService.getId()) : "Inactive";
//            ServicesDTO servicesDTO = new ServicesDTO(netService.getId(), netService.getName(), netService.getCategeroy(), netService.getCharge(), status, netService.getTechnology().getName());
//            servicesDTOList.add(servicesDTO);
//        }
//        return servicesDTOList;
//    }


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
