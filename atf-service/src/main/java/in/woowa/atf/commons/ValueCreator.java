package in.woowa.atf.commons;

import java.util.Random;

public abstract class ValueCreator {
    static final String hangulText = "동해물과백두산이마르고닭도록하나님이보우하사우리나라만세이기상과이맘으로충성을다하여가나다라치키차카하면은우리들마음에있다네코방미마골강혹시유우으이뮤무미무시슈수스류루르리뷰부비부휴후흐히";
    static final String codeText = "0123456789abcdefghi";
    static final Double[] latitudes = {37.507101, 37.500515, 37.500277, 37.500277};
    static final Double[] longitudes = {127.101593, 127.098035, 127.124286, 127.124286};

    public static String randomString(int length) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * 100000) % hangulText.length();
            builder.append(hangulText.substring(index, index + 1));
        }
        return builder.toString();
    }

    public static String randomCode(int length) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * 100000) % codeText.length();
            builder.append(codeText.substring(index, index + 1));
        }
        return builder.toString();
    }

    public static String randomCardNumber() {
        return String.format("%s-%s-%s-%s", randomNumFormatted(4),randomNumFormatted(4),randomNumFormatted(4),randomNumFormatted(4));
    }

    public static String randomZipCode() {
        return String.format("%s-%s", randomNumFormatted(3), randomNumFormatted(3));
    }
    public static String randomUrl() {
        return String.format("http://%s.baemin.com/v1/api/%s", randomString(4), randomString(4));
    }

    public static String randomBizNumber() {
        return String.format("%04d-%04d-%04d", (int) (Math.random() * 10000), (int) (Math.random() * 10000), (int) (Math.random() * 10000));
    }

    public static String randomBirth() {
        return String.format("%04d.%02d.%02d", (int) (Math.random() * 10000), (int) (Math.random() * 10000), (int) (Math.random() * 10000));
    }

    public static String randomTelephone() {
        return String.format("%03d%04d%04d", 0, (int) (Math.random() * 1000), (int) (Math.random() * 1000));
    }

    public static String randomNumFormatted(int length) {
        StringBuilder builder = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            builder.append(random.nextInt(9));
        }
        return builder.toString();
    }

    public static Long randomLong() {
        return new Random().nextLong();
    }

    public static Integer randomInteger() {
        return new Random().nextInt();
    }

    public static Double randomLatitude() {
        return latitudes[(int) (Math.random() * latitudes.length)];
    }

    public static Double randomLongitude() {
        return longitudes[(int) (Math.random() * longitudes.length)];
    }
}
