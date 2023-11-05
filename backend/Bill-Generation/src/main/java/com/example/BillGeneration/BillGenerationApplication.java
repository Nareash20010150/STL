package com.example.BillGeneration;

import com.example.BillGeneration.services.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.event.EventListener;

import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
@EnableScheduling
@EnableDiscoveryClient
public class BillGenerationApplication {

	@Autowired
	private EmailSenderService emailSenderService;


	public static void main(String[] args) {
		SpringApplication.run(BillGenerationApplication.class, args);
	}


//	@EventListener(ApplicationReadyEvent.class)
//	public void sendMail(){
//		emailSenderService.sendEmail(
//				"nareash20010150@gmail.com",
//				"This is a sample email",
//				 "Sample Email"
//		);
//	}

	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}

}
