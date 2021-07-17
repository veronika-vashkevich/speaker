package com.speakmast.backend.services;

import static org.junit.Assert.assertEquals;

import com.speakmast.backend.BackendApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = {BackendApplication.class})
public class CustomJasyptIntegrationTest {

    @Autowired
    ApplicationContext appCtx;

    @Test
    public void whenConfiguredExcryptorUsed_ReturnCustomEncryptor() {
        System.out.println("APP_PASS var is " + System.getenv().get("APP_PASS"));
        Environment environment = appCtx.getBean(Environment.class);
        assertEquals("Password@1", environment.getProperty("encrypted.property"));
    }


}