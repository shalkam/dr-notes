import note from './app/note/queries/index.js';
import template from './app/template/queries/index.js';
import node from './common/node/queries/node.js';
export default { node, ...note, ...template };
