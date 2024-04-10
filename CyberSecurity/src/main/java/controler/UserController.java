package controler;


import data.UserTypeUNI;
import data.UserUNI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import service.UserService;

import javax.print.DocFlavor;

@RestController
public class UserController {

    private UserService userService;
    public ResponseEntity<UserUNI> getUser(@RequestBody String name,
                                           @RequestBody String surName,
                                           @RequestBody String password){
        UserTypeUNI user=userService.findByProperties(name,surName,password);
    }
}
