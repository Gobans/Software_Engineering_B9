const createAnswer = require('./createAnswer/index');
const deleteAnswer = require('./deleteAnswer/index');
const getAnswer = require('./getAnswer/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'createAnswer':
      return await createAnswer.main(event, context);
    case 'deleteAnswer':
      return await deleteAnswer.main(event, context);
    case 'getAnswer':
      return await getAnswer.main(event, context);
  }
};
