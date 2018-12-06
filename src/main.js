import Vue from 'vue'
import App from './App.vue'
import store from './store'

// Import bulma css framework
import 'bulma/css/bulma.min.css'
import 'bulma-slider/dist/css/bulma-slider.min.css'
import './assets/bulma-vertical.scss'

// Import
import { L } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false;


new Vue({
    name: 'vue-and-geo-simplifier',
    store,
    render: h => h(App)
}).$mount('#app')
