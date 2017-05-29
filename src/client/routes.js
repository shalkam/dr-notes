import asyncRoute from './common/routing/async-route.js';
export const app = asyncRoute(() => import('./components/index.js'));
