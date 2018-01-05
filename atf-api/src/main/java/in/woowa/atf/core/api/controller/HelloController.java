package in.woowa.atf.core.api.controller;

import in.woowa.atf.core.api.dto.HelloResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping(value="")
    public HelloResponse hello() {
        return new HelloResponse(false);
    }

}
