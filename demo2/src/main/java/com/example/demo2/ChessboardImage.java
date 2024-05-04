package com.example.demo2;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

public class ChessboardImage {
    private final int SIZE = 8;
    private final int SQUARE_SIZE = 50;
    private final Color COLOR_WHITE = Color.WHITE;
    private final Color COLOR_BLACK = Color.BLACK;

    private final String elephantPicture="/Users/essential/Projects/demo2/src/main/resources/dark-brown-wooden-chess-piece-bishop-elephant-vector-22921691.jpeg";
    private final String soldierPicture="/Users/essential/Projects/demo2/src/main/resources/download.jpeg";

    BufferedImage createChessboardImage(int  piece1Row, int   piece1Col , int  piece2Row, int    piece2Col ) throws Exception {
        BufferedImage image = new BufferedImage(SIZE * SQUARE_SIZE, SIZE * SQUARE_SIZE, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = image.createGraphics();

        // Draw chessboard
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                Color color = (row + col) % 2 == 0 ? COLOR_WHITE : COLOR_BLACK;
                g2d.setColor(color);
                g2d.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
        BufferedImage piece1Image = ImageIO.read(new File(soldierPicture));
        BufferedImage piece2Image = ImageIO.read(new File(elephantPicture));

        drawPiece(g2d, piece1Row, piece1Col, piece1Image); // Example piece 1 (red)
        drawPiece(g2d, piece2Row, piece2Col, piece2Image); // Example piece 2 (green)

        // Check if one piece can attack another
        boolean canAttack = canAttack(piece1Row, piece1Col, piece2Row, piece2Col); // Example check
        System.out.println("Can piece 1 attack piece 2? " + canAttack); // Example output

        g2d.dispose();
        return image;
    }

    private void drawPiece(Graphics2D g2d, int row, int col, BufferedImage pieceImage) {
        g2d.drawImage(pieceImage, col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE, null);
    }


    private boolean canAttack(int row1, int col1, int row2, int col2) throws Exception {

        if(row1>0 && row2>0 && col1>0 && col2>0)
            return Math.abs(row1-row2)==Math.abs(col1-col2);
        else
            throw new Exception("Not valid");
    }
}