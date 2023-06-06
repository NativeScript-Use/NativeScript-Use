import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';
import {useColorMode} from "@vallemar/nativescript-vueuse";
import {THEMES} from "~/data";

useColorMode({
    modes: THEMES
})

createApp(Home).start();
