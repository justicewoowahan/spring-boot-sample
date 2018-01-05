package in.woowa.atf.core.config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@NoArgsConstructor
@ConfigurationProperties(prefix = "shopad")
public class ShopAdClientProperties {
    private String url;

    @Override
    public String toString() {
        return "ShopAdClientProperties{" +
                "url='" + url + '\'' +
                '}';
    }
}
