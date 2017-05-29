import path from 'path';
import fs from 'fs';
import getFieldNames from 'graphql-list-fields';

export default class BaseModel {
  getProjection(fieldASTs) {
    return getFieldNames(fieldASTs).reduce(
      (p, c) => {
        let obj = {};
        obj[c] = 1;
        return Object.assign(p, obj);
      },
      {}
    );
  }
  handleGallery(id, gallery) {
    const uploadDir = path.resolve(__dirname, 'uploads', 'gallery', id);
    const uploadedImages = gallery.map(image => image.name);
    // recursively creating directories if it doesn't exist
    uploadDir.split('/').forEach((dir, index, splits) => {
      const parent = splits.slice(0, index).join('/');
      const dirPath = path.resolve(parent, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });
    let files = [];
    gallery.map((file, index) => {
      const newPath = path.join(uploadDir, file.name);
      if (fs.existsSync(file.path)) {
        fs.renameSync(file.path, newPath);
        file.path = newPath;
        files.push(file);
      }
    });
    // Remove old files
    fs.readdirSync(uploadDir).map(image => {
      if (!uploadedImages.includes(image)) fs.unlinkSync(path.resolve(uploadDir, image));
    });
    return files;
  }
  handleFiles(id, files) {
    const uploadDir = path.resolve(__dirname, '..', 'uploads', 'files', id);
    const uploadedFiles = files.map(file => file.name);
    // recursively creating directories if it doesn't exist
    uploadDir.split('/').forEach((dir, index, splits) => {
      const parent = splits.slice(0, index).join('/');
      const dirPath = path.resolve(parent, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });
    let filesData = [];
    files.map((file, index) => {
      const newPath = path.join(uploadDir, file.name);
      if (fs.existsSync(file.path)) {
        fs.renameSync(file.path, newPath);
        file.path = newPath;
        filesData.push(file);
      }
    });
    // Remove old files
    fs.readdirSync(uploadDir).map(file => {
      if (!uploadedFiles.includes(file)) fs.unlinkSync(path.resolve(uploadDir, file));
    });
    return filesData;
  }
  handleFilesRemove(id) {
    const filesDir = path.resolve(__dirname, '..', 'uploads', 'files', id);
    let removed;
    if (fs.existsSync(filesDir)) {
      fs.readdirSync(filesDir).forEach(function(file, index) {
        var curPath = filesDir + '/' + file;
        fs.unlinkSync(curPath);
      });
      removed = fs.rmdirSync(filesDir);
    }
    return removed;
  }
}
