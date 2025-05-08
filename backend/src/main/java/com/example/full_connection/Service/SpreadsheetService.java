package com.example.full_connection.Service;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Entity.Statistics;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.xddf.usermodel.*;
import org.apache.poi.xddf.usermodel.chart.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Service class for managing spreadsheet-related operations.
 * Service class for generating Excel reports for students and classrooms.
 * This class uses Apache POI to create and manipulate Excel files.
 *
 * Methods:
 * - generateStudentReport: Generates a report for a specific student.
 * - generateClassroomReport: Generates a report for a specific classroom.
 *
 * Dependencies:
 * - Apache POI for Excel file creation.
 * - LocalDateTime for timestamping reports.
 */
@Service
public class SpreadsheetService {

    private static final String SHEETS_DIR = "sheets/";

    public SpreadsheetService() {
        File dir = new File(SHEETS_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public String generateStudentReport(Student student) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet dataSheet = workbook.createSheet("Student Data");

        Statistics stats = student.getStatistics();

        // Style for merged header
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // Merged header
        XSSFRow headerRow = dataSheet.createRow(0);
        XSSFCell headerCell = headerRow.createCell(0);
        headerCell.setCellValue(
                "Student: " + student.getUsername() +
                        " | Class: " + (student.getClassrooms() != null && !student.getClassrooms().isEmpty()
                        ? student.getClassrooms().get(0).getSubject() + " - Level " + student.getClassrooms().get(0).getSubjectLevel()
                        : "N/A") +
                        " | Created: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) +
                        " | Made by ZALK"
        );
        headerCell.setCellStyle(headerStyle);
        dataSheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 11));

        // Column Titles
        XSSFRow columnRow = dataSheet.createRow(2);
        String[] headers = {
                "Total Time In Sessions (min)", "Streak", "Total Questions", "Questions Right", "Questions Wrong",
                "Sessions Completed", "Days Logged In", "Subject Mastery Value", "Guess Rate",
                "Avg Time in Session (min)", "Success Rate (%)", "Avg Time per Question (sec)"
        };

        for (int i = 0; i < headers.length; i++) {
            columnRow.createCell(i).setCellValue(headers[i]);
        }

        // Data Row
        XSSFRow dataRow = dataSheet.createRow(3);
        dataRow.createCell(0).setCellValue(stats.getTotalTimeInSessions());
        dataRow.createCell(1).setCellValue(stats.getStreak());
        dataRow.createCell(2).setCellValue(stats.getTotalQuestions());
        dataRow.createCell(3).setCellValue(stats.getTotalQuestionsRight());
        dataRow.createCell(4).setCellValue(stats.getTotalQuestionsWrong());
        dataRow.createCell(5).setCellValue(stats.getSessionsCompleted());
        dataRow.createCell(6).setCellValue(stats.getDaysLoggedIn());
        dataRow.createCell(7).setCellValue(stats.getSubjectMasteryValue());
        dataRow.createCell(8).setCellValue(stats.getGuessRate());
        dataRow.createCell(9).setCellValue(stats.getAvgTimeSpentInSession());
        dataRow.createCell(10).setCellValue(stats.getSuccessRate());
        dataRow.createCell(11).setCellValue(stats.getAvgTimePerQuestion());

        for (int i = 0; i <= 11; i++) {
            dataSheet.autoSizeColumn(i);
        }

        // ===== Create Chart Sheet =====
        XSSFSheet chartSheet = workbook.createSheet("Student Chart");

        XSSFDrawing drawing = chartSheet.createDrawingPatriarch();
        XSSFClientAnchor anchor = drawing.createAnchor(0, 0, 0, 0, 0, 5, 10, 25);

        XSSFChart chart = drawing.createChart(anchor);
        chart.setTitleText("Student Statistics Overview");
        chart.setTitleOverlay(false);

        XDDFChartLegend legend = chart.getOrAddLegend();
        legend.setPosition(LegendPosition.TOP_RIGHT);

        // Setup category and value data
        XDDFDataSource<String> categories = XDDFDataSourcesFactory.fromStringCellRange(
                dataSheet,
                new CellRangeAddress(2, 2, 0, headers.length - 1)
        );

        XDDFNumericalDataSource<Double> values = XDDFDataSourcesFactory.fromNumericCellRange(
                dataSheet,
                new CellRangeAddress(3, 3, 0, headers.length - 1)
        );

        XDDFCategoryAxis bottomAxis = chart.createCategoryAxis(AxisPosition.BOTTOM);
        bottomAxis.setTitle("Metrics");

        XDDFValueAxis leftAxis = chart.createValueAxis(AxisPosition.LEFT);
        leftAxis.setTitle("Values");

        XDDFChartData data = chart.createData(ChartTypes.BAR, bottomAxis, leftAxis);
        XDDFChartData.Series series = data.addSeries(categories, values);
        series.setTitle("Student Metrics", null);
        chart.plot(data);

        // Save workbook
        String filePath = SHEETS_DIR + "student_" + student.getId() + ".xlsx";
        FileOutputStream fileOut = new FileOutputStream(filePath);
        workbook.write(fileOut);
        fileOut.close();
        workbook.close();

        return filePath;
    }

    public String generateClassroomReport(Classrooms classroom) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet dataSheet = workbook.createSheet("Classroom Data");

        // Style for merged header
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // Merged header
        XSSFRow headerRow = dataSheet.createRow(0);
        XSSFCell headerCell = headerRow.createCell(0);
        headerCell.setCellValue(
                "Classroom: " + classroom.getSubject() + " - Level " + classroom.getSubjectLevel() +
                        " | Created: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) +
                        " | Made by ZALK"
        );
        headerCell.setCellStyle(headerStyle);
        dataSheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 4));

        // Column Titles
        XSSFRow columnRow = dataSheet.createRow(2);
        columnRow.createCell(0).setCellValue("Student Name");
        columnRow.createCell(1).setCellValue("Total Time In Sessions (min)");
        columnRow.createCell(2).setCellValue("Success Rate (%)");
        columnRow.createCell(3).setCellValue("Avg Time Per Question (sec)");

        // Data Rows
        int rowNum = 3;
        for (Student student : classroom.getStudents()) {
            Statistics stats = student.getStatistics();
            XSSFRow dataRow = dataSheet.createRow(rowNum++);
            dataRow.createCell(0).setCellValue(student.getUsername());
            dataRow.createCell(1).setCellValue(stats.getTotalTimeInSessions());
            dataRow.createCell(2).setCellValue(stats.getSuccessRate());
            dataRow.createCell(3).setCellValue(stats.getAvgTimePerQuestion());
        }

        for (int i = 0; i <= 3; i++) {
            dataSheet.autoSizeColumn(i);
        }

        // ===== Create Chart Sheet =====
        XSSFSheet chartSheet = workbook.createSheet("Classroom Chart");

        XSSFDrawing drawing = chartSheet.createDrawingPatriarch();
        XSSFClientAnchor anchor = drawing.createAnchor(0, 0, 0, 0, 0, 5, 10, 25);

        XSSFChart chart = drawing.createChart(anchor);
        chart.setTitleText("Classroom Overview (Time and Success)");
        chart.setTitleOverlay(false);

        XDDFChartLegend legend = chart.getOrAddLegend();
        legend.setPosition(LegendPosition.TOP_RIGHT);

        // Build categories (student names)
        XDDFDataSource<String> categories = XDDFDataSourcesFactory.fromStringCellRange(
                dataSheet,
                new CellRangeAddress(3, rowNum - 1, 0, 0) // student names
        );

        // Build values (total time spent for each student)
        XDDFNumericalDataSource<Double> values = XDDFDataSourcesFactory.fromNumericCellRange(
                dataSheet,
                new CellRangeAddress(3, rowNum - 1, 1, 1) // time spent column
        );

        XDDFCategoryAxis bottomAxis = chart.createCategoryAxis(AxisPosition.BOTTOM);
        bottomAxis.setTitle("Students");

        XDDFValueAxis leftAxis = chart.createValueAxis(AxisPosition.LEFT);
        leftAxis.setTitle("Total Time in Sessions");

        XDDFChartData data = chart.createData(ChartTypes.BAR, bottomAxis, leftAxis);
        XDDFChartData.Series series = data.addSeries(categories, values);
        series.setTitle("Total Time", null);
        chart.plot(data);

        // Save workbook
        String filePath = SHEETS_DIR + "classroom_" + classroom.getClassId() + ".xlsx";
        FileOutputStream fileOut = new FileOutputStream(filePath);
        workbook.write(fileOut);
        fileOut.close();
        workbook.close();

        return filePath;
    }

}
