package com.example.demo2;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        ChessboardImage chessboardImage = new ChessboardImage();
        Scanner scanner=new Scanner(System.in);
        System.out.println("Write coordinate of soldier:");
        String soldier=scanner.nextLine();
        int x1= soldier.charAt(0)-48;
        int y1=soldier.charAt(2)-48;
        System.out.println("Write coordinate of soldier:");
        String elephant=scanner.nextLine();
        int x2= elephant.charAt(0)-48;
        int y2=elephant.charAt(2)-48;
        BufferedImage chessboard = chessboardImage.createChessboardImage(x1,y1,x2,y2);

        JFrame frame = new JFrame("Chessboard");
        JLabel label = new JLabel(new ImageIcon(chessboard));
        frame.getContentPane().add(label);
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}