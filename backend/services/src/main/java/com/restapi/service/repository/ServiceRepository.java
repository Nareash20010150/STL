package com.restapi.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.restapi.service.entity.NetService;

@Repository
public interface ServiceRepository extends JpaRepository<NetService, Integer> {

}
