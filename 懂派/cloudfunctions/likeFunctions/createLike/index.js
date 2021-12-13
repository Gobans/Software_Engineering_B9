const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  let result ={}
  
  await db.collection('like').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      user_id: event.user_id,
      ans_id: event.ans_id
    }
  })

  await db.collection('answer').where({
      _id: event.ans_id
  }).update({
    data:{
      like_cnt : event.like_cnt +1
    }
  })

  return {
    success: true
  };
  
};
