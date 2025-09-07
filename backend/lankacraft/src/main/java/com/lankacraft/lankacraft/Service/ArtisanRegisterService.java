package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Request.ArtisanForm;
import com.lankacraft.lankacraft.Util.MailUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ArtisanRegisterService {

    @Value("${admin.email}")
    private String adminEmail;

    public void sendRequest(ArtisanForm artisanForm) {
        String subject = "Lanka Craft - New Artisan Registration Request: " + artisanForm.getFullName();
        String body = createProfessionalEmailBody(artisanForm);

        MailUtil.sendEmail(adminEmail, subject, body);
    }

    private String createProfessionalEmailBody(ArtisanForm artisanForm) {
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
                        "        .details { background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }\n" +
                        "        .field-label { font-weight: bold; color: #2c3e50; margin-top: 15px; }\n" +
                        "        .field-value { margin-bottom: 15px; padding: 8px; background-color: #f1f3f4; border-left: 4px solid #3498db; }\n" +
                        "        .footer { background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }\n" +
                        "        .timestamp { color: #666; font-size: 12px; text-align: right; margin-bottom: 20px; }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "    <div class='header'>\n" +
                        "        <h1>🏺 Lanka Craft</h1>\n" +
                        "        <h2>New Artisan Registration Received</h2>\n" +
                        "    </div>\n" +
                        "    <div class='content'>\n" +
                        "        <div class='timestamp'>Received on: %s</div>\n" +
                        "        <div class='details'>\n" +
                        "            <h3 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>Artisan Details</h3>\n" +
                        "            <div class='field-label'>👤 Full Name:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            <div class='field-label'>📧 Email:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            <div class='field-label'>📞 Phone Number:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            <div class='field-label'>🏠 Address:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "            <div class='field-label'>🎨 Craft Type:</div>\n" +
                        "            <div class='field-value'>%s</div>\n" +
                        "        </div>\n" +
                        "        <div style='margin-top: 25px; padding: 15px; background-color: #e8f6f3; border-radius: 4px; border-left: 4px solid #27ae60;'>\n" +
                        "            <strong>📌 Action Required:</strong> Please review and approve this artisan registration.\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "    <div class='footer'>\n" +
                        "        <p>This is an automated notification from Lanka Craft Artisan Registration System</p>\n" +
                        "        <p>© Lanka Craft - Handicraft Management Platform</p>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "</html>",
                now.format(formatter),
                artisanForm.getFullName(),
                artisanForm.getEmail(),
                artisanForm.getPhone(),
                artisanForm.getAddress(),
                artisanForm.getCraftType()
        );
    }
}
