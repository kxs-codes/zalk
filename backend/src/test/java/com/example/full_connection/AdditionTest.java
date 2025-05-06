package com.example.full_connection;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AdditionTest {

    @Test
    void testAddPositiveNumbers() {
        Calculator calculator = new Calculator();
        assertEquals(5, calculator.add(2, 3), "2 + 3 should equal 5");
    }

    @Test
    void testAddNegativeNumbers() {
        Calculator calculator = new Calculator();
        assertEquals(-1, calculator.add(2, -3), "2 + (-3) should equal -1");
    }
}