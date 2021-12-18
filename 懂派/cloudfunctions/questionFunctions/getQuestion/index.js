// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  // 实例化数据库
  const db = cloud.database()

  //这里应该使用分页查询
  /** 根据用户的openid获取用户回答 start */
  var question;
  await db.collection('question')
  .where({
    _id: event.question_id,
  })
  .get()
  .then(res => {

    console.log('获取用户提问成功')
    console.log(res.data)

    question = res.data

  })
  /** 根据用户的openid获取用户回答 end */

  var result ={}

  // 返回执行结果

  if(question){

    result.errCode = 0
    result.errMsg = '查询用户回答成功'

  }
  else{
    
    result.errCode = 0
    result.errMsg = '该用户尚无回答'

  }
  console.log(question)

  var data = {}
  data.question = question

  result.data = data

  return result
  
}