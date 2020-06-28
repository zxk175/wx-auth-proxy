let fs = require('fs');
let filepath = './app/data.json';

exports.saveRouter = function(router) {
  let data = fs.readFileSync(filepath, 'utf-8');
  let routerDb = JSON.parse(data).router;
  let length = routerDb.length;

  router.id = length <= 0 ? 1 : routerDb[length - 1].id + 1;
  routerDb.push(router);

  routerDb = JSON.stringify({
    'router': routerDb
  }, null, 2);

  fs.writeFileSync(filepath, routerDb);
};

exports.removeRouter = function(id) {
  let data = fs.readFileSync(filepath, 'utf-8');
  let routerDb = JSON.parse(data).router;

  id = parseInt(id);
  let deleteId = routerDb.findIndex((item) => {
    return item.id === id;
  });

  if (deleteId === -1) {
    return;
  }

  routerDb.splice(deleteId, 1);

  routerDb = JSON.stringify({
    'router': routerDb
  }, null, 2);

  fs.writeFileSync(filepath, routerDb);
};

exports.modifyRouter = function(router) {
  let data = fs.readFileSync(filepath, 'utf-8');
  let routerDb = JSON.parse(data).router;

  let target = routerDb.find((item) => {
    return item.id === router.id;
  });

  for (let key in router) {
    if (router.hasOwnProperty(key)) {
      target[key] = router[key];
    }
  }

  routerDb = JSON.stringify({
    'router': routerDb
  }, null, 2);

  fs.writeFileSync(filepath, routerDb);
};

exports.infoRouter = function(key, value) {
  let data = fs.readFileSync(filepath, 'utf-8');
  let routerDb = JSON.parse(data).router;

  if (key === 'id') {
    value = parseInt(value);
  }

  return routerDb.find((item) => {
    return item[key] === value;
  });
};

exports.listRouter = function() {
  let data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data).router;
};
