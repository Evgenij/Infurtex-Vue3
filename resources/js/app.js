//require('./bootstrap');
import {createApp} from 'vue'
import AntDesign from 'ant-design-vue';
import App from './components/App'
import '../less/ant-design-styles.less'
import router from "./router";
import store from './store/store'

const app = createApp(App)

app.use(AntDesign).use(router).use(store).mount('#app')
