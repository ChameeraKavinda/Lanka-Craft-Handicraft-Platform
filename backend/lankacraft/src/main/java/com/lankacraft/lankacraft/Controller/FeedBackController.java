package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Request.FeedBack;
import com.lankacraft.lankacraft.Service.FeedbackFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedBackController {

    private final FeedbackFormService feedbackFormService;

    @PostMapping("/send")
    public void sendFeedback(@RequestBody FeedBack feedBack){
        feedbackFormService.sendFeedback(feedBack);





    }
}
