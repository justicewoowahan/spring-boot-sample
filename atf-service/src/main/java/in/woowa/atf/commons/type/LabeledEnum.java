package in.woowa.atf.commons.type;

public interface LabeledEnum {
    String getCode();
    String getLabel();

    default LabeledEnumDto toLabeledEnum() {
        return LabeledEnumDto.of(this.getCode(), this.getLabel());
    }
}
