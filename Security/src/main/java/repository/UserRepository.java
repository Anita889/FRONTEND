package repository;

import data.UserUNI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserUNI,Long> {

    UserUNI findByNameAndSurNameAndPassword(String name,String surName,String password);
}
