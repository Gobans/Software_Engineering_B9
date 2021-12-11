const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    await db.collection('like').where({
      ans_id: event.ans_id,
      user_id : event.user_id
    }).remove()

    await db.collection('answer').where({
        _id: event.ans_id
    }).update({
      data:{
        like_cnt : event.like_cnt - 1
      }
    })

    return {
      success: true
    };

  } catch(e) {
    console.error(e)
    return {
      success: true,
      data: 'delete collection success'
    };
  }
}