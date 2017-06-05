import asyncRoute from '../common/routing/async-route.js';

export const note = asyncRoute(() => import('./note/index.js'));
export const template = asyncRoute(() => import('./template/index.js'));
