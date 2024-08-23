const { con } = require('../../configs/mysql')

class QuestionController {
    createNewQuestion(req, res) {
        const body = req.body
        const tags = body.tags.split('#')
        console.log(tags);
        var INSERT_QUESTION = `
            INSERT INTO post (title, detail, createdBy, postTypeId) 
            VALUES ('${body.title}', '${body.detail + body.expecting + body.context}', '${req.userId}', 1)`;
        var INSERT_POST_TAG = 'INSERT INTO postTag(postId, tagName) VALUES(?, ?)'
        con.query(INSERT_QUESTION, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < tags.length; i++) {
                con.query(INSERT_POST_TAG, [results.insertId, tags[i]], function (err, res) {
                    if (err) throw err;
                })
            }
            return res.status(200).json({
                status: 200,
                message: 'Create question successfully',
                data: results
            })
        })
    }

    async getAllQuestion(req, res) {
        var GET_ALL_QUESTION = `SELECT p.id AS postId, p.title, p.detail, p.createdBy, u.fullname AS author, GROUP_CONCAT(t.name SEPARATOR '#') AS tags
          FROM post p
          LEFT JOIN postTag pt ON p.id = pt.postId
          LEFT JOIN tag t ON pt.tagName = t.name
          LEFT JOIN user u ON u.id = p.createdBy
          WHERE p.postTypeId = 1
          GROUP BY p.id`;
        con.query(GET_ALL_QUESTION, (err, results) => {
            if (err) throw err;
            console.log(results);
            return res.status(200).json({
                status: 200,
                message: 'Get all question successfully',
                data: results
            })
        })
    }

    getQuestionById(req, res, next) {
        var GET_QUESTION_BY_ID = `SELECT DISTINCT p.id, p.title, p.detail, p.createdBy, u.fullname AS author, u.id, GROUP_CONCAT(t.name SEPARATOR '#') AS tags
          FROM post p
          LEFT JOIN postTag pt ON p.id = pt.postId
          LEFT JOIN tag t ON pt.tagName = t.name
          LEFT JOIN user u ON u.id = p.createdBy
          WHERE p.id = ${req.params.id}
          GROUP BY p.id`;
        con.query(GET_QUESTION_BY_ID, (err, results) => {
            if (err) throw err;
            return res.status(200).json({
                status: 200,
                message: 'Get question successfully',
                data: results[0]
            })
        })
    }

}

module.exports = new QuestionController();