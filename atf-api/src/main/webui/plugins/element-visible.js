export const elementVisible = function(element, value) {
    console.log('call=>elementVisible');

    let $element = $(element);
    let visible = $element.attr("value");
    console.log(`visible:${visible}`);

    if (visible === 'show') {
        $element.css('display','');
    } else {
        $element.css('display','none');
    }


};
