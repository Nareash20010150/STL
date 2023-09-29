package com.restapi.user.service;

import com.restapi.user.model.User;
import com.restapi.user.payload.response.objects.UserDetails;
import com.restapi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportService {
    @Autowired
    private UserRepository userRepository;

    public UserDetails getUserDetailsById(Integer userId){
        User user = userRepository.findUserById(userId);

        if(user != null) {
            UserDetails userDetails = new UserDetails(
                    user.getUsername(),
                    user.getFirstName(),
                    user.getLastName()
            );

            return userDetails;
        } else {
            return null;
        }
    }
}
