package blog.backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.backend.backend.models.Notification;
import blog.backend.backend.repository.NotiRepository;

@Service
public class NotiService {
    @Autowired
    private NotiRepository repository;

    public Notification addNoti(Notification noti) {
        return repository.save(noti);
    }
}
