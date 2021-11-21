const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('question').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        user_id: event.user_id,
        question_content: event.question_content,
        pic_url: event.pic_url,
        question_time: event.question_time,
      }
    }).then(res=>{
      console.log(res) // 这里会看 产生的id
    })
    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'create collection success'
    };
  }
};
