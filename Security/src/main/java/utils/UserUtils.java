package utils;

import data.UserTypeUNI;

public class UserUtils {

    public static String calculatePassword(String notEncrypted) throws Exception {
        StringBuilder result = new StringBuilder();
        if (notEncrypted.length() < 8) {
            throw new Exception("Not valid password");
        }
        notEncrypted = notEncrypted.toUpperCase();
        String key = notEncrypted.substring(3, 7);

        int keyIndex = 0;

        for (char c : notEncrypted.toCharArray()) {
            if (Character.isLetter(c)) {
                int shift = (key.charAt(keyIndex) - 'A') % 26;
                int newChar = (c + shift - 'A') % 26 + 'A';
                result.append((char) newChar);
                keyIndex = (keyIndex + 1) % key.length();
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }

    public static boolean isValidCodeNumber(Integer n) {
        if (n <= 1) {
            return false;
        }
        if (n <= 3) {
            return true; // 2 and 3 are prime
        }
        if (n % 2 == 0 || n % 3 == 0) {
            return false; // Divisible by 2 or 3, not prime
        }
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }

    public static String calculateUserType(Integer userTypeCode) {
        if (userTypeCode < 1000)
            return UserTypeUNI.STUDENT.name();
        else if (userTypeCode < 10000)
            return UserTypeUNI.MANAGER.name();
        else return UserTypeUNI.ADMIN.name();
    }
}
