package in.woowa.atf.infrastructure.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailNotificationService implements NotificationService {

    @Override
    public void send(String from, String to, String content) {
        log.info("email send => from:{}, to:{}, content:{}", from, to, content);
    }
}
