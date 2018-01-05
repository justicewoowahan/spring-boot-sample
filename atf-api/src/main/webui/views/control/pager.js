import Woowahan from 'woowahan';
import Template from './pager.hbs';

export const Pager = Woowahan.View.create('Pager', {
    template: Template,

    events: {
        'click a.page-link': 'onPaging'
    },

    viewWillMount(renderData) {
        const numOfRows = renderData.numOfRows;
        const currentPage = renderData.currentPage;
        const total = renderData.total;

        const totalPage = Math.ceil(total / numOfRows);

        let start = parseInt((currentPage - 1) / 10) * 10;
        let count = Math.min(10, totalPage - start);

        renderData.prevPage = start - 9;
        renderData.nextPage = start + 11;

        const numbers = Array.from({ length: count }, () => {
                return { num: ++start, active: currentPage == start }
            });

        renderData.prev = currentPage > 10;
        renderData.numbers = numbers;
        renderData.next = count == 10;

        return renderData;
    },

    onPaging(event) {
        const currPage = this.getModel('currentPage');

        let page = $(event.currentTarget).data('page');

        switch (page) {
            case 'prev':
                page = (parseInt(currPage / 10, 10) * 10) - 9;
                break;
            case 'next':
                page = (parseInt(currPage / 10, 10) * 10) + 11;
                break;
        }

        this.dispatch(Woowahan.Event.create('paging', +page));

        return false;
    }
});

// Pager.parsePageable = rs => ({ currentPage: (rs.number || 0) + 1, total: rs.totalElements, numOfRows: rs.size });
