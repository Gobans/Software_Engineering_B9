// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  /** 校验参数是否必传 start */

  if(event.user_id == undefined){

    // 返回执行结果
    var result = {}
    result.errCode = 1
    result.errMsg = '无用户信息，请重新登录'

    var data = {}
    result.data = data

    return result

  }
  /** 校验参数是否必传 end */


  // 实例化数据库
  const db = cloud.database()

  /** 根据用户的openid获取用户提问 start */
  var questions;
  await db.collection('question')
  .orderBy('question_time','desc')
  .where({
    user_id: event.user_id
  })
  .field({
    question_title: true,
    question_content: true,
    ansNum:true
    //is_accept:true
  })
  .get()
  .then(res => {

    console.log('获取用户提问成功')
    console.log(res.data)

    questions = res.data

  })
  /** 根据用户的openid获取用户提问 end */

 

  // 返回执行结果
  var result = {}

  if(questions){

    result.errCode = 0
    result.errMsg = '查询用户提问成功'

  }
  else{
    
    result.errCode = 0
    result.errMsg = '该用户尚无提问'

  }

  var data = {}
  data.questions = questions

  result.data = data

  return result
  
}