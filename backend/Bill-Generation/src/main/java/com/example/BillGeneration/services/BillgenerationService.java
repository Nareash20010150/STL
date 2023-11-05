package com.example.BillGeneration.services;

import com.example.BillGeneration.CustomerService;
import com.example.BillGeneration.Services;
import com.example.BillGeneration.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
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
    private EmailSenderService emailSenderService;
    private final RestTemplate restTemplate;
    private UserDetails userDetails;

    @Autowired
    public BillgenerationService(RestTemplate restTemplate, UserDetails userDetails) {
        this.restTemplate = restTemplate;
        this.userDetails = userDetails;
    }

    @Scheduled(cron = "0 0 0 1 * ?")
//@PostConstruct
    public void generateBill() {
        YearMonth currentYearMonth = YearMonth.now();
        // Get the current month as an enum value (e.g., Month.JANUARY, Month.FEBRUARY, etc.)
        Month currentMonth = currentYearMonth.getMonth();
        String month = currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH);

//        get all users from user service
        String url = "http://localhost:6001/api/user/all";
        ResponseEntity<List<UserDetails>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<UserDetails>>() {}
        );
        List<UserDetails> allUsers = response.getBody();

//        for each user find the enabled services
       allUsers.forEach(user -> {
           StringBuilder allServiceDetails = new StringBuilder();
           AtomicInteger totalAmount = new AtomicInteger(0);

//           getting details of all the services enabled by the user
           String serviceURL = "http://localhost:6002/api/service/customer/"+user.getId();
//           CustomerService AllCustomerServices = restTemplate.getForObject(serviceURL, CustomerService.class);
           ResponseEntity<List<CustomerService>> response2 = restTemplate.exchange(
                   serviceURL,
                   HttpMethod.GET,
                   null,
                   new ParameterizedTypeReference<List<CustomerService>>() {}
           );
           List<CustomerService> AllCustomerServices = response2.getBody();

////           foreach service calculate total and generate bill
           AllCustomerServices.forEach(customer -> {
                   String serviceDetails = "Service Name: " + customer.getService().getName() + "\n" +
                           "Service Charge: " + customer.getService().getCharge() + "\n";
                   allServiceDetails.append(serviceDetails);
                   totalAmount.addAndGet(customer.getService().getCharge());

           });

//           message for email notification
           String message =
                   "Dear "+user.getFirstName()+" "+user.getLastName()+",\n" +
                     "Your detailed bill for the month of "+month+" along with the charges is listed below: \n" +
                         allServiceDetails+"\n"+ "Total Amount: "+totalAmount+"\n"+
                        "Thank you for using our services\n";

           System.out.println("message to be Sent"+message);
//           send email notification
           emailSenderService.sendEmail(user.getEmail(),message,"Bill for the month of "+month);

           String viewbillUrl = "http://localhost:5252/api/viewbills";
           String viewCustomerbillUrl = viewbillUrl + "?userId=" + user.getId() + "&message=" + message+ "&amount=" + totalAmount;

           System.out.println("viewCustomerbillUrl"+viewCustomerbillUrl);
           ResponseEntity<String> notificationResponse = restTemplate.postForEntity(viewCustomerbillUrl, null, String.class);
       });

    }

}
