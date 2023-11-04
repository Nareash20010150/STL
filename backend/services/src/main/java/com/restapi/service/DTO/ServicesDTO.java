package com.restapi.service.DTO;

public class ServicesDTO {
    private Integer id;
    private String name;
    private String categeroy;
    private Long charge;
    private String status;

    private String technology;

    public ServicesDTO(Integer id, String name, String categeroy, Long charge, String status, String technology){
        this.id = id;
        this.name = name;
        this.categeroy = categeroy;
        this.charge = charge;
        this.status= status;
        this.technology = technology;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategeroy() {
        return categeroy;
    }

    public Long getCharge() {
        return charge;
    }

    public String getStatus() {
        return status;
    }

    public String getTechnology() {
        return technology;
    }
}
