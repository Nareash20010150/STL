package com.restapi.service.controller;

import com.restapi.service.service.CustomerService;
import com.restapi.service.service.ServiceManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private ServiceManagementService serviceManagementService;
    @Autowired
    private CustomerService customerService;

    @PostMapping("/enable/{userid}/{serviceid}")
    public Void enableService(@PathVariable("userid") Integer userid, @PathVariable("serviceid") Integer serviceid) {
        customerService.enableService(userid, serviceid);
        return null;
    }



}
