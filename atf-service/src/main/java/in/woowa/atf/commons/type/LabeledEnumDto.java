package in.woowa.atf.commons.type;

import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class LabeledEnumDto {
    private String label;
    private String value;

    public static List<LabeledEnumDto> convertFrom(List<LabeledEnum> conditions) {
        return conditions.stream()
                .map(v -> LabeledEnumDto.of(v))
                .collect(Collectors.toList());
    }

    public static LabeledEnumDto of(String code, String label) {
        LabeledEnumDto instance = new LabeledEnumDto();
        instance.value = code;
        instance.label = label;
        return instance;
    }

    public static LabeledEnumDto of(LabeledEnum labeledEnum) {
        LabeledEnumDto instance = new LabeledEnumDto();
        instance.value = labeledEnum.getCode();
        instance.label = labeledEnum.getLabel();
        return instance;
    }
}
