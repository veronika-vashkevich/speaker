package com.speakmast.backend.services;

import com.speakmast.backend.dtos.ContactMeDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;

@Service
public class EmailServiceImpl implements EmailService {
    @Value("${google.gmail.password}")
    private String password;


    @Override
    public void sendEmail(ContactMeDto contactMeDto) {

        Properties props = new Properties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", "speakmast@gmail.com");
        props.put("mail.smtp.password", password);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator(){
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                                props.get("mail.smtp.user").toString(), props.get("mail.smtp.password").toString());// Specify the Username and the PassWord
                    }
                });
        MimeMessage message = new MimeMessage(session);

        try {


            System.out.println("Working Directory = " + System.getProperty("user.dir"));
            message.setFrom(props.getProperty("mail.smtp.user"));
            message.setRecipients(Message.RecipientType.TO, contactMeDto.getEmail());
            message.setSubject("Confirmation email from SPEAK MAST");

            String msg = "Dear "+ contactMeDto.getName() + "\r\n, this email confirms you are registered in our system. \r\n We will contact you within 24 hours! See you soon ;)";

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            mimeBodyPart.setContent(msg, "text/html");

            MimeBodyPart attachmentBodyPart = new MimeBodyPart();
            String logoPath = System.getProperty("user.dir") + "/backend/src/main/resources/images/logo.jpg";
            attachmentBodyPart.attachFile(new File(logoPath));

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);
            multipart.addBodyPart(attachmentBodyPart);

            message.setContent(multipart);

            Transport.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
