package in.woowa.atf.externals.address;

import com.woowahan.juso.client.transform.JusoSearchService;
import com.woowahan.juso.client.transform.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class DefaultAddressSearchServiceAdapter implements AddressSearchServiceAdapter {

    private final JusoSearchService jusoSearchService;

    @Inject
    public DefaultAddressSearchServiceAdapter(JusoSearchService jusoSearchService) {
        this.jusoSearchService = jusoSearchService;
    }

    @Override
    public List<SidoResponse> searchSidoAll() {
        return jusoSearchService.searchSidoAll();
    }

    @Override
    public List<SigunguResponse> searchSigunguBySido(String provinceCode) {
        return jusoSearchService.searchSigunguBySido(provinceCode);
    }

    @Override
    public List<DongOfAdminResponse> searchDongOfAdminBySigungu(String sigungu) {
        return jusoSearchService.searchDongOfAdminBySigungu(sigungu);

    }

    @Override
    public Page<JusoResponse> searchJusoPage(String sigunguCode,
                                             String search,
                                             Pageable pageable) {
        return jusoSearchService.searchJusoBySigungu(sigunguCode, search, pageable);
    }

    @Override
    public Page<JusoResponse> searchJusoPage(String search, Pageable pageable) {
        return jusoSearchService.searchJuso(search, pageable);
    }

    @Override
    public AddressDto selectAddress(JusoDetailRequest jusoDetailRequest) {
        return jusoSearchService.selectAddress(jusoDetailRequest);
    }

    @Override
    public AddressDto selectAddress(Double latitude,
                                    Double longitude) {
        return jusoSearchService.selectAddress(new Coordinate().withLatitude(latitude).withLongtitude(longitude));
    }

    @Override
    public Page<JusoResponse> searchJusoBySigungu(String sigunguCode, String search, Pageable pageable) {
        return jusoSearchService.searchJusoBySigungu(sigunguCode, search, pageable);
    }

    @Override
    public Page<JusoResponse> searchJuso(String search, Pageable pageable) {
        return jusoSearchService.searchJuso(search, pageable);
    }

    @Override
    public AddressDto selectAddress(Coordinate coordinate) {
        return jusoSearchService.selectAddress(coordinate);
    }
}
