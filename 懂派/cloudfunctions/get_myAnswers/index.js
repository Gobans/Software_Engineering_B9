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

  //这里应该使用分页查询
  /** 根据用户的openid获取用户回答 start */
  var answers;
  await db.collection('answer')
  .orderBy('ans_time','desc')
  .where({
    ans_user_id: event.user_id,
    status: true
  })
  .field({
    _id: true,
    question_id: true,  
    ans_content: true,
    like_cnt:true,
  })
  .get()
  .then(res => {

    console.log('获取用户提问成功')
    console.log(res.data)

    answers = res.data

  })
  /** 根据用户的openid获取用户回答 end */

 

  // 返回执行结果
  var result = {}

  if(answers){

    result.errCode = 0
    result.errMsg = '查询用户回答成功'

  }
  else{
    
    result.errCode = 0
    result.errMsg = '该用户尚无回答'

  }
  //根据answers中的quesiton_id查询问题内容
  var question_id
  var quesiton_title
  for (var index=0,len=answers.length; index<len; index++){
    question_id = answers[index].question_id
    //检验是否取对 
    console.log("当前的question_id是：",question_id)
    await db.collection('question')
    .where({
        _id: question_id
    })
    .field({
        question_title:true
    })
    .get()
    .then(res => {
        quesiton_title = res.data[0].question_title
    })

    answers[index].question_title = quesiton_title

  }


  var data = {}
  data.answers = answers

  result.data = data

  return result
  
}