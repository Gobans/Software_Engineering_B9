const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('answer').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        ans_user_id: event.ans_user_id,
        nickName: event.nickName,
        avatarUrl:event.avatarUrl,
        is_accept: event.is_accept,
        like_cnt: 0,
        ans_time: event.ans_time,
        ans_content: event.ans_content,
        question_id : event.question_id,
        question_title : event.question_title,
        question_content : event.question_content,
        status: true,
      }
    }).then(res=>{
      console.log(res) // 这里会看 产生的id
    })
    // 增加经验 要测试
    // await db.collection('user').where({
    //   user_id : event.user_id
    // }).update({exp:this.exp+1})

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
