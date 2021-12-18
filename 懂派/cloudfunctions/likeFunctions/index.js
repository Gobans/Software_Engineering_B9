const checkLike = require('./checkLike/index');
const createLike = require('./createLike/index');
const deleteLike = require('./deleteLike/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'checkLike':
      return await checkLike.main(event, context);
    case 'createLike':
      return await createLike.main(event, context);
    case 'deleteLike':
      return await deleteLike.main(event, context);
  }
};
