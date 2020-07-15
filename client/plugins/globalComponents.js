import Vue from 'vue';
import sidebar from '../components/sidebar';

const components = {sidebar}
Object.entries(components).forEach(([name, component]) => {
   Vue.component(name, component)
 })