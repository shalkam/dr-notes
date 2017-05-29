import path from 'path';
import loki from 'lokijs';
export default () => {
  return new Promise(function(resolve, reject) {
    const dbConnect = new loki(path.join(__dirname, '..', 'db.json'), {
      autosave: true,
      autoload: true,
      autoloadCallback() {
        dbConnect.addCollection('notes');
        resolve(dbConnect);
      }
    });
  });
};
