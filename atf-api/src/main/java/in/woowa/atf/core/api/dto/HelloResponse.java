package in.woowa.atf.core.api.dto;

import lombok.Getter;

@Getter
public class HelloResponse {
    private boolean success;


    public HelloResponse(boolean success) {
        this.success = success;
    }
}
