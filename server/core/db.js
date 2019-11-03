const fs = require('fs');
const path = require('path');

class DB {
  constructor(file) {
    this.DBName = file;
    this.file = path.join(__dirname, '..', '..', 'data', `${file}.json`);

    this.data = JSON.parse(fs.readFileSync(this.file));

    this.watcher = fs.watchFile(this.file, () => {
      fs.readFile(this.file, (err, info) => {
        if (err) {
          throw err;
        }

        this.data = JSON.parse(info);
      });
    });
  }

  getAll() {
    return this.data;
  }

  addUser(name, result = false) {
    if (this.DBName !== 'users') {
      return false;
    }
    if (this.data.some((item) => (item.name === name))) {
      return false;
    }
    const newUser = {};
    newUser.name = name;
    newUser.result = result;
    this.data.push(newUser);
    return this.data;
  }

  setResult(name = '', result = '') {
    if (this.DBName !== 'users') {
      return false;
    }
    if (!name || !result) {
      return false;
    }
    this.data.forEach((item) => {
      if (item.name !== name) {
        return false;
      }
      item.result = result;
    });
    return this.data;
  }

  unmount() {
    fs.unwatchFile(this.file, this.watcher);
  }
}

const bases = {};

function craeteDB(name) {
  if (bases.hasOwnProperty(name)) {
    return bases[name];
  }
  const newBase = new DB(name);
  bases[name] = newBase;
  return newBase;
}

module.exports = craeteDB;
