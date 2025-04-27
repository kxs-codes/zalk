package com.example.full_connection.Service;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileOutputStream;
import java.io.IOException;

/* TODO - >
    1. Need to make the file save within a specific directory called: sheets
*   2. Make a merged column with the following:
        Name of the Student or Classrooms
        Date of creation
        Class Name or null
    3.
        Time spent on software's
        Average accuracy of questions answered
        Average difficulty of question answered
        etc
    4. Creation of visual representation
*
*  */

public class SpreadsheetService {
    public static void main(String[] args) throws IOException {
        // Step 1: Create a new Excel Workbook
        XSSFWorkbook workbook = new XSSFWorkbook();

       XSSFSheet sheet = workbook.createSheet();
       XSSFRow row = sheet.createRow(0);

       row.createCell(0).setCellValue("Classroom");
       row.createCell(1).setCellValue("Classroom");
       row.createCell(2).setCellValue("Classroom");

       FileOutputStream fileOut = new FileOutputStream("classrooms.xlsx");
       workbook.write(fileOut);
       fileOut.close();
        System.out.println("Done");

    }
}
