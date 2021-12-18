const deleteQuestion = require('./deleteQuestion/index');
const createQuestion = require('./createQuestion/index');
const getQuestion = require('./getQuestion/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'deleteQuestion':
      return await deleteQuestion.main(event, context);
    case 'createQuestion':
      return await createQuestion.main(event, context);
    case 'getQuestion':
      return await getQuestion.main(event, context);
  }
};
