import Woowahan from "woowahan";
import DefaultLayout from "./layouts";
import * as views from "./views";
import * as reducers from "./reducers";
import * as plugins from "./plugins";

global.jQuery = global.$ = Woowahan.$;


const app = new Woowahan();

app.use(Woowahan.Layout('#app', DefaultLayout));
app.use(reducers);
app.use([Woowahan.Plugin('input-radio', plugins.InputRadio)]);
app.use([Woowahan.Plugin('text-area', plugins.textArea)]);
app.use([Woowahan.Plugin('element-visible', plugins.elementVisible)]);
app.use([Woowahan.Plugin('selectize', plugins.Selectize)]);
app.use([Woowahan.Plugin('datepicker', plugins.DatePicker)]);

const routes = {
    url: '/shopad', view: views.shopAdDealManagementView, container: '.main-contents', layout: 'DefaultLayout', pages: [
        { url: 'create', view: views.adRegistrationView },
        { url: 'approve', view: views.shopAdDealManagementView },
        { url: 'approve/:shopAdDealId', view: views.shopAdDealDetailView }
    ],

};

app.start(routes);
