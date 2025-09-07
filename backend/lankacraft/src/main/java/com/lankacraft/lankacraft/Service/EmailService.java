package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Request.OrderConfirmationData;
import com.lankacraft.lankacraft.Request.PaymentRequest;
import com.lankacraft.lankacraft.Request.ProductItem;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public String generateOrderConfirmationEmail(OrderConfirmationData orderData) {
        StringBuilder productItemsHtml = new StringBuilder();


        for (ProductItem product : orderData.getProducts()) {
            productItemsHtml.append(String.format(
                    "<div class=\"product-item\">" +
                            "<div class=\"product-header\">" +
                            "<div>" +
                            "<div class=\"product-name\">%s</div>" +
                            "<div class=\"product-details\">%s</div>" +
                            "<div class=\"product-details\">" +
                            "<strong>Material:</strong> %s" +
                            "</div>" +
                            "</div>" +
                            "<div class=\"product-price\">Rs.%.2f</div>" +
                            "</div>" +
                            "<div class=\"product-quantity\">Quantity: %d</div>" +
                            "</div>",
                    product.getName(),
                    product.getDescription(),
                    product.getMaterial(),
                    product.getPrice(),
                    product.getQuantity()
            ));
        }

        // Main email template - simplified to use only available data

        return String.format(
                "<!DOCTYPE html>" +
                        "<html lang=\"en\">" +
                        "<head>" +
                        "<meta charset=\"UTF-8\">" +
                        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                        "<title>Order Confirmation - LankaCraft</title>" +
                        "<style>" +
                        "* { margin: 0; padding: 0; box-sizing: border-box; }" +
                        "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; }" +
                        ".email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; }" +
                        ".header { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); color: white; padding: 30px; text-align: center; }" +
                        ".header h1 { font-size: 28px; margin-bottom: 10px; font-weight: 600; }" +
                        ".header p { font-size: 16px; opacity: 0.9; }" +
                        ".content { padding: 30px; }" +
                        ".greeting { font-size: 18px; margin-bottom: 20px; color: #2c3e50; }" +
                        ".order-summary { background: #f8f9fa; border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #667eea; }" +
                        ".order-summary h2 { color: #2c3e50; margin-bottom: 20px; font-size: 20px; font-weight: 600; }" +
                        ".order-details { display: grid; gap: 15px; }" +
                        ".detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e9ecef; }" +
                        ".detail-row:last-child { border-bottom: none; font-weight: 600; font-size: 16px; color: #2c3e50; }" +
                        ".detail-label { font-weight: 500; color: #555; }" +
                        ".detail-value { font-weight: 600; color: #2c3e50; }" +
                        ".product-section { margin: 25px 0; }" +
                        ".product-item { background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 15px; transition: transform 0.2s ease; }" +
                        ".product-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }" +
                        ".product-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }" +
                        ".product-name { font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 5px; }" +
                        ".product-price { font-size: 18px; font-weight: 700; color: #667eea; }" +
                        ".product-details { color: #666; margin-bottom: 10px; }" +
                        ".product-quantity { background: #e9ecef; padding: 5px 12px; border-radius: 20px; display: inline-block; font-size: 14px; font-weight: 500; }" +
                        ".next-steps { background: #e8f4fd; border-radius: 8px; padding: 20px; margin: 25px 0; }" +
                        ".next-steps h3 { color: #2c3e50; margin-bottom: 15px; font-size: 18px; }" +
                        ".next-steps ul { list-style: none; padding-left: 0; }" +
                        ".next-steps li { margin-bottom: 10px; padding-left: 25px; position: relative; }" +
                        ".next-steps li::before { content: \"✓\"; position: absolute; left: 0; color: #28a745; font-weight: bold; }" +
                        ".footer { background: #2c3e50; color: white; padding: 30px; text-align: center; }" +
                        ".footer h3 { margin-bottom: 15px; font-size: 18px; }" +
                        ".footer p { margin-bottom: 10px; opacity: 0.9; }" +
                        "@media (max-width: 600px) {" +
                        ".email-container { margin: 10px; border-radius: 8px; }" +
                        ".header, .content, .footer { padding: 20px; }" +
                        ".detail-row { flex-direction: column; align-items: flex-start; gap: 5px; }" +
                        ".product-header { flex-direction: column; gap: 10px; }" +
                        "}" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<div class=\"email-container\">" +
                        "<div class=\"header\">" +
                        "<h1>✨ Order Confirmed!</h1>" +
                        "<p>Thank you for choosing LankaCraft</p>" +
                        "</div>" +
                        "<div class=\"content\">" +
                        "<div class=\"greeting\">Hello Valued Customer,</div>" +
                        "<p>We're excited to confirm that your order has been successfully placed! Our artisans are already preparing your beautiful handcrafted items with care and attention to detail.</p>" +
                        "<div class=\"order-summary\">" +
                        "<h2>📋 Order Summary</h2>" +
                        "<div class=\"order-details\">" +
                        "<div class=\"detail-row\">" +
                        "<span class=\"detail-label\">Order ID:</span>" +
                        "<span class=\"detail-value\">#%s</span>" +
                        "</div>" +
                        "<div class=\"detail-row\">" +
                        "<span class=\"detail-label\">Order Date:</span>" +
                        "<span class=\"detail-value\">%s</span>" +
                        "</div>" +
                        "<div class=\"detail-row\">" +
                        "<span class=\"detail-label\">Total Items:</span>" +
                        "<span class=\"detail-value\">%d items</span>" +
                        "</div>" +
                        "<div class=\"detail-row\">" +
                        "<span class=\"detail-label\">Total Amount:</span>" +
                        "<span class=\"detail-value\">Rs.%.2f</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class=\"product-section\">" +
                        "<h2 style=\"color: #2c3e50; margin-bottom: 20px; font-size: 20px;\">🎨 Your Handcrafted Items</h2>" +
                        "%s" +
                        "</div>" +
                        "<div class=\"next-steps\">" +
                        "<h3>📦 What happens next?</h3>" +
                        "<ul>" +
                        "<li>We'll begin crafting your order within 24 hours</li>" +
                        "<li>You'll receive a shipping notification with tracking details</li>" +
                        "<li>Estimated delivery: 7-10 business days</li>" +
                        "<li>Our support team will keep you updated throughout the process</li>" +
                        "</ul>" +
                        "</div>" +
                        "<p>Each piece is lovingly handcrafted by skilled artisans, ensuring you receive something truly unique and special. We appreciate your support of traditional Sri Lankan craftsmanship!</p>" +
                        "<p style=\"margin-top: 20px; font-size: 14px; color: #666;\">" +
                        "Have questions? Contact our customer care team at lankacraft@gmail.com or +94 75 399 8444." +
                        "</p>" +
                        "</div>" +
                        "<div class=\"footer\">" +
                        "<h3>Thank you for supporting handmade crafts! 🙏</h3>" +
                        "<p>LankaCraft - Authentic Sri Lankan Handicrafts</p>" +
                        "<p>Kandy road, Sri Lanka</p>" +
                        "<p>Email: lankacraft@gmail.com | Phone: +94 75 399 8444</p>" +
                        "<p style=\"margin-top: 20px; font-size: 12px; opacity: 0.7;\">" +
                        "You received this email because you placed an order with us." +
                        "</p>" +
                        "</div>" +
                        "</div>" +
                        "</body>" +
                        "</html>",
                orderData.getOrderId(),
                orderData.getOrderDate(),
                orderData.getTotalQuantity(),
                orderData.getTotalAmount(),
                productItemsHtml.toString()
        );
    }


    public String generateSellerOrderNotificationEmail(OrderConfirmationData orderData) {
        StringBuilder productItemsHtml = new StringBuilder();

        for (ProductItem product : orderData.getProducts()) {
            productItemsHtml.append(String.format(
                    "<div class=\"product-item\">" +
                            "<div class=\"product-header\">" +
                            "<div>" +
                            "<div class=\"product-name\">%s</div>" +
                            "<div class=\"product-details\">%s</div>" +
                            "<div class=\"product-details\"><strong>Material:</strong> %s</div>" +
                            "</div>" +
                            "<div class=\"product-price\">Rs.%.2f</div>" +
                            "</div>" +
                            "<div class=\"product-quantity\">Quantity: %d</div>" +
                            "</div>",
                    product.getName(),
                    product.getDescription(),
                    product.getMaterial(),
                    product.getPrice(),
                    product.getQuantity()
            ));
        }

        return String.format(
                "<!DOCTYPE html>" +
                        "<html lang=\"en\">" +
                        "<head>" +
                        "<meta charset=\"UTF-8\">" +
                        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                        "<title>New Order Received - LankaCraft</title>" +
                        "<style>" +
                        "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0; }" +
                        ".email-container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);}"+
                        ".header { background: #2c3e50; color: white; padding: 20px; text-align: center; }" +
                        ".header h1 { margin: 0; font-size: 24px; }" +
                        ".content { padding: 20px; }" +
                        ".order-summary { background: #f8f9fa; padding: 15px; border-left: 4px solid #2c3e50; margin-bottom: 20px; }" +
                        ".order-summary h2 { margin-bottom: 10px; font-size: 18px; }" +
                        ".detail-row { display: flex; justify-content: space-between; padding: 5px 0; }" +
                        ".detail-label { font-weight: bold; }" +
                        ".product-item { border: 1px solid #ddd; padding: 15px; border-radius: 6px; margin-bottom: 10px; }" +
                        ".product-name { font-weight: bold; font-size: 16px; }" +
                        ".product-price { font-size: 16px; color: #2c3e50; font-weight: bold; }" +
                        ".footer { background: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 12px; }" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<div class=\"email-container\">" +
                        "<div class=\"header\">" +
                        "<h1>🛍️ New Order Alert</h1>" +
                        "<p>You have received a new order on LankaCraft</p>" +
                        "</div>" +
                        "<div class=\"content\">" +
                        "<div class=\"order-summary\">" +
                        "<h2>Order Details</h2>" +
                        "<div class=\"detail-row\"><span class=\"detail-label\">Order ID:</span><span>#%s</span></div>" +
                        "<div class=\"detail-row\"><span class=\"detail-label\">Order Date:</span><span>%s</span></div>" +

                        "</div>" +
                        "<h2>📦 Products Ordered</h2>" +
                        "%s" +
                        "<p style=\"margin-top:20px; font-size:14px; color:#555;\">Please prepare the items for shipping. Our logistics partner will handle pickup and delivery.</p>" +
                        "</div>" +
                        "<div class=\"footer\">" +
                        "<p>LankaCraft Seller Portal</p>" +
                        "<p>This is an automated notification of a new order.</p>" +
                        "</div>" +
                        "</div>" +
                        "</body>" +
                        "</html>",
                orderData.getOrderId(),
                orderData.getOrderDate(),

                productItemsHtml.toString()
        );
    }

}
