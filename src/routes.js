import Login from './login.vue';
import Chat from './chat.vue';

export const routes = [
    { path: '', name: 'home', component: Login},
    { path: '/chat/:username/:room', name: 'chat', component: Chat},
    { path: '/redirect-me', redirect: { name: 'home' } },
    
];