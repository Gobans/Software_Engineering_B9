const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('question').where({
      _id: event.question_id,
      user_id: event.user_id
    }).remove()
  } catch(e) {
    console.error(e)
  }
}