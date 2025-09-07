package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Request.ArtisanForm;
import com.lankacraft.lankacraft.Request.FeedBack;
import com.lankacraft.lankacraft.Service.ArtisanRegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artisan")
@RequiredArgsConstructor
public class ArtisanFormController {

    private final ArtisanRegisterService artisanRegisterService;

    @PostMapping("/request")
    public void sendRequest(@RequestBody ArtisanForm artisanForm) {
        artisanRegisterService.sendRequest(artisanForm);
    }
}
