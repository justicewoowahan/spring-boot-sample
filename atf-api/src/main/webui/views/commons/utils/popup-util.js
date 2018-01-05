export const popupUtils = {
    createPopupOption(title, desc) {
        return {
            useDefaultCss: false,
            css: popupUtils.simplePopupCss(),
            title: title,
            desc: desc
        }
    },

    simplePopupCss() {
        return {
            overflowY: 'auto',
            display: 'block',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            maxHeight: '220px',
            background: '#fff',
            webkitTransform: 'translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)'
        };
    }

}