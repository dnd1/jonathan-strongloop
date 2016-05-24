module.exports = function(DndUser) {

  DndUser.unset = function(user, callback) {
    user.instance.unsetAttribute('fullname');
    user.instance.unsetAttribute('credentials');
    user.instance.unsetAttribute('challenge');
  };

  DndUser.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.isNewInstance == true) {
      ctx.instance.createdAt = new Date();
    }
    next();
  });

  DndUser.afterRemote('unset', function(ctx, next) {
    next();
  });
};
