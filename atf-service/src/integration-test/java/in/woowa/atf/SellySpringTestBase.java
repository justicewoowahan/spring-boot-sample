package in.woowa.atf;

import in.woowa.atf.commons.CommonConfig;
import lombok.extern.slf4j.Slf4j;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {CommonConfig.class})
@Slf4j
public abstract class SellySpringTestBase {
}
