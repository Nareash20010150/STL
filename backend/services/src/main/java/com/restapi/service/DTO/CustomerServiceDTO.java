package com.restapi.service.DTO;

import com.restapi.service.entity.NetService;

public class CustomerServiceDTO {
    private Integer customerid;
    private NetService service;

    public CustomerServiceDTO() {
    }

    public CustomerServiceDTO(Integer customerid, NetService service) {
        this.customerid = customerid;
        this.service = service;
    }

    public Integer getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Integer customerid) {
        this.customerid = customerid;
    }

    public NetService getService() {
        return service;
    }

    public void setService(NetService service) {
        this.service = service;
    }

}
