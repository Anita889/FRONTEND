package service;


import data.UserUNI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.UserRepository;
import utils.UserUtils;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserUNI findByProperties(String name,String surName,String password) throws Exception {
        return repository.findByNameAndSurNameAndPassword(name,surName,UserUtils.calculatePassword(password));
    }

    public UserUNI createNewUser(String name, String surName, Date birthday, String password, String city, String facultate, Integer userTypeCode) {
        UserUNI userUNI=UserUNI.builder().
                name(name).
                surName(surName).
                birthday(birthday).
                password(password).
                city(city).
                userTypeCode(userTypeCode).
                build();
        repository.save(userUNI);
        return userUNI;
    }
    public UserUNI findById(Long id){
            return repository.findById(id).get();
    }

    public UserUNI updateUser(UserUNI userUNI, String name,
                              String surName,
                              Date birthday,
                              String password,
                              String city,
                              String facultate,
                              Integer userTypeCode) throws Exception {
        if(name!=null){
            userUNI.setName(name);
        }
        if(surName!=null){
            userUNI.setSurName(surName);
        }
        if(birthday!=null){
            userUNI.setBirthday(birthday);
        }
        if(facultate!=null){
            userUNI.setFacultate(facultate);
        }
        if(city!=null){
            userUNI.setCity(city);
        }
        if(password!=null){
            userUNI.setPassword(UserUtils.calculatePassword(password));
        }
        if(UserUtils.isValidCodeNumber(userTypeCode)){
            userUNI.setUserTypeCode(userTypeCode);
            userUNI.setUserType(UserUtils.calculateUserType(userTypeCode));
        }
        repository.save(userUNI);
        return userUNI;
    }

    public Boolean deleteById(Long id) throws Exception {
        if(repository.findById(id).isPresent()){
            repository.deleteById(id);
            return true;
        }
        else
            throw new Exception("Not have that user");
    }
}
