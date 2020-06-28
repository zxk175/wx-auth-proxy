'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller['home'].index);

  router.get('/code/v1', controller['wxCode'].index);
  router.post('/code/add/v1', controller['wxCode'].saveRouter);
  router.post('/code/remove/v1', controller['wxCode'].removeRouter);
  router.post('/code/modify/v1', controller['wxCode'].modifyRouter);
  router.get('/code/info/v1', controller['wxCode'].infoRouter);
  router.post('/code/list/v1', controller['wxCode'].listRouter);
};
