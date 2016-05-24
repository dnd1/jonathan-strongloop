module.exports = function(DndUser) {
// createdAt como SOLAMENTE NUEVA INSTANCIA Y METODO REMOTO DONDE ESCONDE LOS ATRIBUTOS
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

//AGREGAMOS UN METODO REMOTO DONDE SE AGREGA EL NOMBRE COMPLETO EN MINISCULAS CON UN "-"+"ID"
module.exports = function(nickname){

        nickname.addId = function(name,name_id,cb) {
          cb(null, function(name){
            return(name.toLowerCase().replace(" ","-")+name_id);
          });
        }

        nickname.remoteMethod(
            'addId',
            {
              accepts:[
                {arg: 'name', type: 'string'},
                {arg: 'name_id', type: 'number'} ],

              returns: {arg: 'nickname', type: 'string'}
            });
};
