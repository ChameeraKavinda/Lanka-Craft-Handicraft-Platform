package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.OrderException;
import com.lankacraft.lankacraft.Model.Order;
import com.lankacraft.lankacraft.Model.OrderItem;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Repository.OrderItemRepo;
import com.lankacraft.lankacraft.Repository.OrderRepo;
import com.lankacraft.lankacraft.Request.OrderConfirmationData;
import com.lankacraft.lankacraft.Request.PaymentRequest;
import com.lankacraft.lankacraft.Request.ProductItem;
import com.lankacraft.lankacraft.Service.EmailService;
import com.lankacraft.lankacraft.Util.MailUtil;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final EmailService emailService;
    @PostMapping("/create-session")
    public String createSession(@RequestBody PaymentRequest request) throws Exception {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success/" + request.getOrderId() + "/" + request.getAmount())
                .setCancelUrl("http://localhost:5173/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("lkr")
                                                .setUnitAmount(request.getAmount()) // in cents
                                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName(request.getProductName())
                                                        .build())
                                                .build())
                                .build())
                .build();

        Session session = Session.create(params);
        return session.getUrl(); // frontend can redirect to this URL
    }

    @PostMapping("/orderconfirmation")
    public void orderconfirmation(@RequestBody PaymentRequest request) throws Exception {
        Optional<Order> byId = orderRepo.findById(request.getOrderId());

        Order order = byId.orElseThrow(() -> new OrderException("Order Not Found"));
        List<OrderItem> byOrder = orderItemRepo.findByOrder(order);
        OrderConfirmationData orderConfirmationData = new OrderConfirmationData();
        orderConfirmationData.setOrderId(String.valueOf(order.getOrder_id()));
        orderConfirmationData.setOrderDate(
                order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
        );
        orderConfirmationData.setTotalQuantity(order.getTotalItem());
        orderConfirmationData.setTotalAmount(order.getTotalPrice());

        Map<String, List<ProductItem>> artisanProductMap = new HashMap<>();

        List<ProductItem> productItemList=new ArrayList<>();
        for (OrderItem orderItem : byOrder) {
            Product product = orderItem.getProduct();
            ProductItem productItem=new ProductItem();
            productItem.setName(product.getTitle());
            productItem.setDescription(product.getDescription());
            productItem.setMaterial(product.getBrand());
            productItem.setPrice(orderItem.getPrice());
            productItem.setQuantity(orderItem.getQuantity());
            productItemList.add(productItem);

            String artisanEmail = product.getArtisanEmail();

            artisanProductMap
                    .computeIfAbsent(artisanEmail, k -> new ArrayList<>())
                    .add(productItem);

        }

        orderConfirmationData.setProducts(productItemList);
        String confirmationEmail = emailService.generateOrderConfirmationEmail(orderConfirmationData);
        MailUtil.sendEmail(
                request.getEmail(),
                "Your Oder has been Placed",
                confirmationEmail
        );


        for (Map.Entry<String, List<ProductItem>> entry : artisanProductMap.entrySet()) {
            String artisanEmail = entry.getKey();
            List<ProductItem> products = entry.getValue();
            orderConfirmationData.setProducts(products);
            String sellerorderEmail = emailService.generateSellerOrderNotificationEmail(orderConfirmationData);

            MailUtil.sendEmail(
                    artisanEmail,
                    "Your have new Order!!",
                    sellerorderEmail
            );

        }

    }






}
