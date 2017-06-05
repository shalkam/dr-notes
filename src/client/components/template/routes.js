import asyncRoute from '../../common/routing/async-route.js';

export const index = asyncRoute(() => import('./list/index.js'));
export const form = asyncRoute(() => import('./form/index.js'));
export const details = asyncRoute(() => import('./details/index.js'));
export const del = asyncRoute(() => import('./delete/index.js'));
