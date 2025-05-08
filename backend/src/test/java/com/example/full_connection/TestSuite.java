package com.example.full_connection;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;
import org.junit.platform.suite.api.SuiteDisplayName;


// Purpose: Test all of the test cases within one file for main computation 
/**
 * Test suite for the application.
 * This class is used to group and run all test cases.
 */
@Suite
@SuiteDisplayName(" Test Suite")
@SelectClasses({
    SessionService2Test.class,
    SessionServiceTest.class
    })
public class TestSuite {}