package in.woowa.atf.core.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix="juso")
public class JusoClientProperties {
    private String url;

}
