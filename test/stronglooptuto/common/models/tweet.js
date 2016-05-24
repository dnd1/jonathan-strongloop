module.exports = function(Tweet) {

  Tweet.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.isNewInstance == true) {
      ctx.instance.createdAt = new Date();
    }
    next();
  });

};
