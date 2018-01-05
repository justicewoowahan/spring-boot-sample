package in.woowa.atf;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowahan.juso.client.JusoSearchRestTemplate;
import com.woowahan.juso.client.transform.JusoSearchService;
import in.woowa.atf.commons.CommonConfig;
import in.woowa.atf.core.config.JusoClientProperties;
import in.woowa.atf.core.config.ShopAdClientProperties;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Arrays;

@ComponentScan(basePackages = {"in.woowa.atf"})
@Import({CommonConfig.class})
@Configuration
@EnableConfigurationProperties({ShopAdClientProperties.class})
public class SellyServiceConfig {

    @Configuration
    @EnableConfigurationProperties({JusoClientProperties.class})
    public static class JusoClientConfiguration {

        private static final int MAX_TOTAL = 200;

        private static final int MAX_PER_ROUTE = 20;

        private static final int TIME_OUT = 30000;

        private ClientHttpRequestFactory clientHttpRequestFactory() {
            HttpComponentsClientHttpRequestFactory factory =
                    new HttpComponentsClientHttpRequestFactory();
            factory.setHttpClient(getCloseableHttpClient());
            factory.setConnectTimeout(TIME_OUT);
            factory.setConnectionRequestTimeout(TIME_OUT);
            factory.setReadTimeout(TIME_OUT);
            return factory;
        }

        private CloseableHttpClient getCloseableHttpClient() {
            return HttpClientBuilder.create()
                    .setSSLHostnameVerifier(new NoopHostnameVerifier())
                    .setConnectionManager(poolingHttpClientConnectionManager())
                    .setDefaultRequestConfig(requestConfig())
                    .build();
        }

        private PoolingHttpClientConnectionManager poolingHttpClientConnectionManager() {
            PoolingHttpClientConnectionManager poolingHttpClientConnectionManager =
                    new PoolingHttpClientConnectionManager();
            poolingHttpClientConnectionManager.setMaxTotal(MAX_TOTAL);
            poolingHttpClientConnectionManager.setDefaultMaxPerRoute(MAX_PER_ROUTE);
            return poolingHttpClientConnectionManager;
        }

        private RequestConfig requestConfig() {
            return RequestConfig.custom()
                    .setConnectTimeout(TIME_OUT)
                    .setConnectionRequestTimeout(TIME_OUT)
                    .setSocketTimeout(TIME_OUT)
                    .build();
        }


        @Bean
        public JusoSearchService jusoSearchService(JusoClientProperties jusoClientProperties) {
            return new JusoSearchRestTemplate(
                    jusoClientProperties.getUrl(),
                    new RestTemplate(clientHttpRequestFactory()));
        }
    }



    @Configuration
    public class RestTemplateConfiguration {

        private static final int MAX_TOTAL = 200;

        private static final int MAX_PER_ROUTE = 20;

        private static final int TIME_OUT = 30000;

        private ObjectMapper objectMapper() {
            ObjectMapper mapper = new ObjectMapper();
            mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return mapper;
        }

        @Bean
        public RestOperations restTemplate() {
            RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory());
            MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
            converter.setObjectMapper(objectMapper());
            converter.setSupportedMediaTypes(Arrays.asList(MediaType.TEXT_HTML,MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON_UTF8));
            restTemplate.setMessageConverters(Arrays.asList(converter));
            return restTemplate;
        }

        private ClientHttpRequestFactory clientHttpRequestFactory() {
            HttpComponentsClientHttpRequestFactory factory =
                    new HttpComponentsClientHttpRequestFactory();
            factory.setHttpClient(getCloseableHttpClient());
            factory.setConnectTimeout(TIME_OUT);
            factory.setConnectionRequestTimeout(TIME_OUT);
            factory.setReadTimeout(TIME_OUT);
            return factory;
        }

        private CloseableHttpClient getCloseableHttpClient() {
            return HttpClientBuilder.create()
                    .setSSLHostnameVerifier(new NoopHostnameVerifier())
                    .setConnectionManager(poolingHttpClientConnectionManager())
                    .setDefaultRequestConfig(requestConfig())
                    .build();
        }

        private PoolingHttpClientConnectionManager poolingHttpClientConnectionManager() {
            PoolingHttpClientConnectionManager poolingHttpClientConnectionManager =
                    new PoolingHttpClientConnectionManager();
            poolingHttpClientConnectionManager.setMaxTotal(MAX_TOTAL);
            poolingHttpClientConnectionManager.setDefaultMaxPerRoute(MAX_PER_ROUTE);
            return poolingHttpClientConnectionManager;
        }

        private RequestConfig requestConfig() {
            return RequestConfig.custom()
                    .setConnectTimeout(TIME_OUT)
                    .setConnectionRequestTimeout(TIME_OUT)
                    .setSocketTimeout(TIME_OUT)
                    .build();
        }
    }



}
