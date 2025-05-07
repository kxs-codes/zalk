package com.example.full_connection;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;
import org.junit.platform.suite.api.SuiteDisplayName;



@Suite
@SuiteDisplayName("Calculator Test Suite")
@SelectClasses({
    SessionService2Test.class,
    SessionServiceTest.class
    })
public class TestSuite {
    // This class remains empty, it's just a holder for the suite annotations
}