const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('answer').where({
      _id: event.ans_id
    }).update({
      data:{ans_content: event.ans_content,
      ans_time: event.ans_time
      }
    })
  } catch(e) {
    console.error(e)
  }
}