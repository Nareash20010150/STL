package com.example.BillGeneration.services;

import com.example.BillGeneration.CustomerService;
import com.example.BillGeneration.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicInteger;

@Service

public class BillgenerationService {
    @Autowired
    private NotificationService notificationService;
    private final RestTemplate restTemplate;
    private UserDetails userDetails;

    @Autowired
    public BillgenerationService(RestTemplate restTemplate, UserDetails userDetails) {
        this.restTemplate = restTemplate;
        this.userDetails = userDetails;
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void generateBill() {
        YearMonth currentYearMonth = YearMonth.now();
        // Get the current month as an enum value (e.g., Month.JANUARY, Month.FEBRUARY, etc.)
        Month currentMonth = currentYearMonth.getMonth();
        String month = currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        String url = "http://localhost:6001/api/user/support/all";
        ResponseEntity<List<UserDetails>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<UserDetails>>() {}
        );
        List<UserDetails> allUsers = response.getBody();

       allUsers.forEach(user -> {
           StringBuilder allServiceDetails = new StringBuilder();
           AtomicInteger totalAmount = new AtomicInteger(0);

//           getting details of all the services enabled by the user
           String serviceURL = "http://localhost:6002/api/service/customer/"+user.getId();
           CustomerService AllCustomerServices = restTemplate.getForObject(serviceURL, CustomerService.class);

//           foreach service calculate total and generate bill
           AllCustomerServices.getServiceName().forEach(service -> {
               String serviceDetails = "Service Name: " + service.getName() + "\n" +
                       "Service Charge: " + service.getCharge() + "\n";
               allServiceDetails.append(serviceDetails);
               totalAmount.addAndGet(service.getCharge());

           });

//           message for email notification
           String message =
                   "Dear "+user.getFirstName()+" "+user.getLastName()+",\n" +
                     "Your detailed bill for the month of "+month+" along with the charges is listed below \n" +
                         allServiceDetails+"\n"+ "Total Amount: "+totalAmount+"\n"+
                        "Thank you for using our services.\n";

//           send email notification
           notificationService.sendEmailNotification(user.getEmail(),message);
       });

    }

}
