const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('answer').where({
      _id: event.answer_id
    }).remove()
  } catch(e) {
    console.error(e)
  }
}