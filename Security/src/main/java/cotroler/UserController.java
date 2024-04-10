package cotroler;

import data.UserUNI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import service.UserService;

import java.util.Date;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, value = "api/get")
    public ResponseEntity<UserUNI> getUser(@RequestBody String name,
                                           @RequestBody String surName,
                                           @RequestBody String password) throws Exception {
        UserUNI user = userService.findByProperties(name, surName, password);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "api/create")
    public ResponseEntity<UserUNI> createUser(@RequestBody String name,
                                              @RequestBody String surName,
                                              Date birthday,
                                              @RequestBody String password,
                                              String city,
                                              @RequestBody String facultate,
                                              @RequestBody Integer userTypeCode) {
        UserUNI userUNI = userService.createNewUser(name, surName, birthday, password, city, facultate, userTypeCode);
        return ResponseEntity.ok(userUNI);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "api/update")
    public ResponseEntity<Boolean> updateUser(@RequestBody Long id,
                                              String name,
                                              String surName,
                                              Date birthday,
                                              String password,
                                              String city,
                                              String facultate,
                                              Integer userTypeCode) throws Exception {
        UserUNI userUNI = userService.findById(id);
        boolean isUpdate = false;
        if (userUNI != null) {
            userService.updateUser(userUNI,name,
                    surName,
                     birthday,
                     password,
                     city,
                     facultate,
                     userTypeCode);
            isUpdate = true;
        }
        return ResponseEntity.ok(isUpdate);
    }
   @RequestMapping(method = RequestMethod.DELETE,value = "api/delete")
    public ResponseEntity<Boolean> deleteUser(@RequestBody Long id) throws Exception {
        return ResponseEntity.ok(userService.deleteById(id));
   }
}

