package blog.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import blog.backend.models.Notification;
import blog.backend.services.NotiService;

@RestController
@RequestMapping("/notifications")
public class NotiController {
    @Autowired
    public NotiService service;  

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Notification createNoti(@RequestBody Notification noti) {
        return service.addNoti(noti);
    }
}
