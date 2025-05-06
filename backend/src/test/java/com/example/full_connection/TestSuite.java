package com.example.full_connection;

import com.example.full_connection.AdditionTest;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;
import org.junit.platform.suite.api.SuiteDisplayName;

@Suite
@SuiteDisplayName("Calculator Test Suite")
@SelectClasses({
        AdditionTest.class,
        // Add more test classes here as needed
})
public class TestSuite {
    // This class remains empty, it's just a holder for the suite annotations
}