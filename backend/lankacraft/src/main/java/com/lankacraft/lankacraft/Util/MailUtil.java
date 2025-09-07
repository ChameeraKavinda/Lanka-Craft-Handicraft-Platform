package com.lankacraft.lankacraft.Util;

import jakarta.mail.*;
import jakarta.mail.internet.*;

import java.util.Properties;

public class MailUtil {

    // Replace with your Gmail + App Password
    private static final String FROM_EMAIL = "chameeratest@gmail.com";
    private static final String PASSWORD = "mrdm qvha sdhf rpcq"; // Not your Gmail password!


    public static void sendEmail(String toEmail, String subject, String body) {
        // Gmail SMTP configuration
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        // Authenticate
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(FROM_EMAIL, PASSWORD);
            }
        });

        try {
            // Create email message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(FROM_EMAIL));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);

            // Body as HTML
            message.setContent(body, "text/html; charset=utf-8");

            // Send
            Transport.send(message);

            System.out.println(" Email sent to: " + toEmail);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Error sending email: " + e.getMessage());
        }
    }
}
