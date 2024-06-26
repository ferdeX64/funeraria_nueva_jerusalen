import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import './assets/index.postcss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import es from 'element-plus/es/locale/lang/es'

const head = createHead()
const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(ElementPlus, {
    locale: es,
  })
app.use(head)
app.use(createPinia())

app.mount('#app')
