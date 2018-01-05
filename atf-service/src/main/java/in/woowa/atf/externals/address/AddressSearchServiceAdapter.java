package in.woowa.atf.externals.address;

import com.woowahan.juso.client.transform.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AddressSearchServiceAdapter {
    List<SidoResponse> searchSidoAll();

    List<SigunguResponse> searchSigunguBySido(String provinceCode);

    List<DongOfAdminResponse> searchDongOfAdminBySigungu(String sigungu);

    Page<JusoResponse> searchJusoPage(String sigunguCode,
                                      String search,
                                      Pageable pageable);

    Page<JusoResponse> searchJusoPage(String search, Pageable pageable);

    AddressDto selectAddress(JusoDetailRequest jusoDetailRequest);

    AddressDto selectAddress(Double latitude,
                             Double longitude);

    Page<JusoResponse> searchJusoBySigungu(String sigunguCode, String search, Pageable pageable);

    Page<JusoResponse> searchJuso(String search, Pageable pageable);

    AddressDto selectAddress(Coordinate coordinate);
}
