package in.woowa.atf.infrastructure.notification;

public interface NotificationService {
    void send(String from, String to, String content);
}
