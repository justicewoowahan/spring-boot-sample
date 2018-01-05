package in.woowa.atf.core.api;

import in.woowa.atf.SellyServiceConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Import({SellyServiceConfig.class})
@Configuration
public class TestConfig {

}
