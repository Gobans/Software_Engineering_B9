// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  // 实例化数据库
  const db = cloud.database()

  //这里应该使用分页查询
  /** 根据用户的openid获取用户回答 start */
  let result = {}
  await db.collection('like')
  .where({
    ans_id: event.ans_id,
    user_id : event.user_id
  }).get().then(
    res => {
      result.data = res.data
    }
  )
  if (result.data.length == 1){
    result.is_like = true
  }else{
    result.is_like = false
  }

  return result

  /** 根据用户的openid获取用户回答 end */
}