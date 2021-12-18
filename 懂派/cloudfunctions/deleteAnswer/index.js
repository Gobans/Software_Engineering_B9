// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  /** 校验参数是否必传 start */

  if(event.ans_id == undefined){

    // 返回执行结果
    var result = {}
    result.errCode = 1
    result.errMsg = '无回答信息，删除失败'

    return result

  }
  /** 校验参数是否必传 end */


  // 实例化数据库
  const db = cloud.database()

  console.log("待删除的回答id：",event.ans_id)
  //删除的回答只需要修改状态
  to_update_data = {
      status: false
  }

  /** 根据用户的openid获取用户提问 start */
  await db.collection('answer')
  .where({
    _id: event.ans_id
  })
  .update({
      data: to_update_data
  })
  .then(res => {

    console.log('删除该条回答成功')
    console.log(res.stats.updated)



  })
  /** 根据用户的openid获取用户提问 end */
  var result = {}
  result.errCode = 0
  result.errMsg = '删除该条回答成功'
  return result
  
}