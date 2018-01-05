package in.woowa.atf.externals.support;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class CustomPageImpl<T> extends PageImpl<T> {
    private static final long serialVersionUID = 1L;
    private long totalElements;
    private boolean last;
    private boolean first;
    private int numberOfElements;
    private int totalPages;
    private int size;
    private int number;
    private List<T> content;
    private Sort sort;

    public CustomPageImpl() {
        super(new ArrayList<>());
    }

    public Page<T> pageImpl() {
        return new PageImpl<>(getContent(), new PageRequest(getNumber(),
                getSize(), getSort()), getTotalElements());
    }
}