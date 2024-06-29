const { con } = require('../../configs/mysql')

function getAllTags(req, res, next) {
    const GET_ALL_TAGS = `SELECT * FROM tag`

    con.query(GET_ALL_TAGS, function (err, results) {
        if (err) throw err;
        console.log(results)
        return res.status(200).json({
            status: 200,
            message: 'Get all tags successfully',
            data: results
        })
    })
}

function createNewTag(req, res, next) {
    const body = req.body
    console.log(body);
    var INSERT_TAG = `INSERT INTO tag (name, description) VALUES ('${body.name}', '${body.description}')`;
    con.query(INSERT_TAG, function (err, results) {
        if (err) throw err;
        console.log(results)
        return res.status(200).json({
            status: 200,
            message: 'Create tag successfully',
            data: results
        })
    })
}

module.exports = {
    getAllTags,
    createNewTag
}