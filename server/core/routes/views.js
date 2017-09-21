const strings = require('../Strings');
const authController = require('../controllers/AuthController');

module.exports = (router) => {
  if (global.app.get('env') === 'development') {
    router.get('/test/mail', (req, res) => {
      global.events.emit(strings.SEND_EMAIL, {
        to: req.query.to,
        subject: req.query.subject || 'Test',
        template: {
          name: strings.TEMPLATE_FOR_TEST,
          data: Object.assign(req.query, {
            test: 'test',
          }),
        },
      });
      res.status(200).send();
    });
    router.get('/test/template/:templateName', (req, res) => {
      res.render(`app/emailTemplates/${req.params.templateName}`, {
        user: {
          first_name: 'samundra',
          last_name: 'kc',
        },
        fpHash: 'test',
        hash: 'test',
        host: 'http://localhost:3001',
        url: 'http://www.goog.com',
        status: 'Completed',
        description: 'success',
        id: '1',
        email: 'samundrak@yahoo.com',
        service: 'Google Drive',
        created_at: new Date(),
        end_at: new Date(),
      });
    });
  }
  router.get('/app', authController.app);
  router.get('/app/*', authController.app);
  router.get('/*', authController.home);

  return router;
};
