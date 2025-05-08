package com.example.full_connection;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;
import org.junit.platform.suite.api.SuiteDisplayName;


// Purpose: Test all of the test cases within one file for main computation 
@Suite
@SuiteDisplayName("Calculator Test Suite")
@SelectClasses({
    SessionService2Test.class,
    SessionServiceTest.class
    })
public class TestSuite {}