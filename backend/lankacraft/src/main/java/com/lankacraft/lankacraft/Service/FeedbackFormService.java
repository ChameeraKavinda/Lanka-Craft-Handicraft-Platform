package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Request.FeedBack;
import com.lankacraft.lankacraft.Util.MailUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FeedbackFormService {

    @Value("${admin.email}")
    private String adminEmail;

    public void sendFeedback(FeedBack feedBack) {
        String body = createProfessionalEmailBody(feedBack);
        String subject = "Lanka Craft - New Customer Feedback: " + feedBack.getSubject();

        MailUtil.sendEmail(adminEmail, subject, body);
    }

    private String createProfessionalEmailBody(FeedBack feedBack) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy 'at' hh:mm a");

        return String.format(
                "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "    <style>\n" +
                        "        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }\n" +
                        "        .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }\n" +
                        "        .content { padding: 30px; background-color: #f8f9fa; }\n" +
                        "        .feedback-details { background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }\n" +
                        "        .field-label { font-weight: bold; color: #2c3e50; margin-top: 15px; }\n" +
                        "        .field-value { margin-bottom: 15px; padding: 8px; background-color: #f1f3f4; border-left: 4px solid #3498db; }\n" +
                        "        .message-box { background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 4px; }\n" +
                        "        .footer { background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }\n" +
                        "        .timestamp { color: #666; font-size: 12px; text-align: right; margin-bottom: 20px; }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "    <div class='header'>\n" +
                        "        <h1>🏺 Lanka Craft</h1>\n" +
                        "        <h2>New Customer Feedback Received</h2>\n" +
                        "    </div>\n" +
                        "    \n" +
                        "    <div class='content'>\n" +
                        "        <div class='timestamp'>Received on: %s</div>\n" +
                        "        \n" +
                        "        <div class='feedback-details'>\n" +
                        "            <h3 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>Feedback Details</h3>\n" +
                        "            \n" +
                        "            <div class='field-label'>👤 Customer Name:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            \n" +
                        "            <div class='field-label'>📧 Email Address:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            \n" +
                        "            <div class='field-label'>📋 Subject:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            \n" +
                        "            <div class='field-label'>💬 Message:</div>\n" +
                        "            <div class='message-box'>%s</div>\n" +
                        "        </div>\n" +
                        "        \n" +
                        "        <div style='margin-top: 25px; padding: 15px; background-color: #e8f6f3; border-radius: 4px; border-left: 4px solid #27ae60;'>\n" +
                        "            <strong>📌 Action Required:</strong> Please review and respond to this feedback within 24-48 hours to maintain excellent customer service standards.\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "    \n" +
                        "    <div class='footer'>\n" +
                        "        <p>This is an automated notification from Lanka Craft Feedback System</p>\n" +
                        "        <p>© Lanka Craft - Handicraft Management Platform</p>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "</html>",
                now.format(formatter),
                feedBack.getName(),
                feedBack.getEmail(),
                feedBack.getSubject(),
                feedBack.getMessage().replace("\n", "<br>")
        );
    }

    // Alternative plain text version for email clients that don't support HTML
    private String createPlainTextEmailBody(FeedBack feedBack) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy 'at' hh:mm a");

        return String.format(
                "═══════════════════════════════════════════════════════════════\n" +
                        "                         🏺 LANKA CRAFT                        \n" +
                        "                   NEW CUSTOMER FEEDBACK RECEIVED              \n" +
                        "═══════════════════════════════════════════════════════════════\n\n" +
                        "Received on: %s\n\n" +
                        "┌─ FEEDBACK DETAILS ─────────────────────────────────────────┐\n" +
                        "│                                                            │\n" +
                        "│  👤 CUSTOMER NAME:                                         │\n" +
                        "│     %s                                                     │\n" +
                        "│                                                            │\n" +
                        "│  📧 EMAIL ADDRESS:                                         │\n" +
                        "│     %s                                                     │\n" +
                        "│                                                            │\n" +
                        "│  📋 SUBJECT:                                               │\n" +
                        "│     %s                                                     │\n" +
                        "│                                                            │\n" +
                        "│  💬 MESSAGE:                                               │\n" +
                        "│     %s                                                     │\n" +
                        "│                                                            │\n" +
                        "└────────────────────────────────────────────────────────────┘\n\n" +
                        "📌 ACTION REQUIRED:\n" +
                        "Please review and respond to this feedback within 24-48 hours\n" +
                        "to maintain excellent customer service standards.\n\n" +
                        "═══════════════════════════════════════════════════════════════\n" +
                        "This is an automated notification from Lanka Craft Feedback System\n" +
                        "© Lanka Craft - Handicraft Management Platform\n" +
                        "═══════════════════════════════════════════════════════════════",
                now.format(formatter),
                feedBack.getName(),
                feedBack.getEmail(),
                feedBack.getSubject(),
                feedBack.getMessage()
        );
    }
}