var DataTypes = require('sequelize').DataTypes;
var _app_notification = require('./app_notification');
var _app_post = require('./app_post');
var _app_reply = require('./app_reply');
var _app_user = require('./app_user');

function initModels(sequelize) {
  var app_notification = _app_notification(sequelize, DataTypes);
  var app_post = _app_post(sequelize, DataTypes);
  var app_reply = _app_reply(sequelize, DataTypes);
  var app_user = _app_user(sequelize, DataTypes);

  app_reply.belongsTo(app_post, { as: 'origin', foreignKey: 'origin_id' });
  app_post.hasMany(app_reply, { as: 'app_replies', foreignKey: 'origin_id' });
  app_notification.belongsTo(app_user, { as: 'creatorID', foreignKey: 'creatorID_id' });
  app_user.hasMany(app_notification, { as: 'app_notifications', foreignKey: 'creatorID_id' });
  app_notification.belongsTo(app_user, { as: 'recipientID', foreignKey: 'recipientID_id' });
  app_user.hasMany(app_notification, {
    as: 'recipientID_app_notifications',
    foreignKey: 'recipientID_id',
  });
  app_post.belongsTo(app_user, { as: 'user', foreignKey: 'user_id' });
  app_user.hasMany(app_post, { as: 'app_posts', foreignKey: 'user_id' });
  app_reply.belongsTo(app_user, { as: 'user', foreignKey: 'user_id' });
  app_user.hasMany(app_reply, { as: 'app_replies', foreignKey: 'user_id' });

  return {
    app_notification,
    app_post,
    app_reply,
    app_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
