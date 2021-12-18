const createAnswer = require('./createAnswer/index');
const deleteAnswer = require('./deleteAnswer/index');
const getAnswer = require('./getAnswer/index');
const getHotAnswer = require('./getHotAnswer/index');
const getChangeAnswer = require('./getChangeAnswer/index');
const updateAnswer = require('./updateAnswer/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'createAnswer':
      return await createAnswer.main(event, context);
    case 'deleteAnswer':
      return await deleteAnswer.main(event, context);
    case 'getAnswer':
      return await getAnswer.main(event, context);
    case 'getChangeAnswer':
      return await getChangeAnswer.main(event, context);
    case 'updateAnswer':
      return await updateAnswer.main(event, context);
    case 'getHotAnswer':
      return await getHotAnswer.main(event, context);
  }
};
