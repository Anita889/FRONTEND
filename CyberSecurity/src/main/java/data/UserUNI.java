package data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUNI {
    private String name;
    private String surName;
    private Date birthday;
    private String city;
    private String facultate;
    private String userType;
}
