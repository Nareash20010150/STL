package com.restapi.service.controller;

import com.restapi.service.service.CustomerServiceService;
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
    private CustomerServiceService customerServiceService;

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
