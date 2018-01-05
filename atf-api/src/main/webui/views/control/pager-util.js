export const pagerUtil = {
    parsePageable(rs) {
        return {currentPage: (rs.number || 0) + 1, total: rs.totalElements, numOfRows: rs.size};
    }
};