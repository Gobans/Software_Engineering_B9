const createLike = require('./createLike/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'createLike':
      return await createLike.main(event, context);
  }
};
