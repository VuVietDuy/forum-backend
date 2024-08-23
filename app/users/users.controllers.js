const { con } = require('../../configs/mysql')
const jwt = require('jsonwebtoken');
require("dotenv").config();

class UserController {
    register(req, res, next) {
        let password = req.body.password;
        let email = req.body.email;
        let fullname = req.body.fullname;
        if (password && email) {
            con.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    res.send('Username has existed!');
                } else {
                    con.query('INSERT INTO user(fullname, email, password) VALUES(?,?,?)', [fullname, email, password], function (error, results) {
                        if (error) throw error;

                    });
                    res.send('Register success!');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    }

    login(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        if (password && email) {
            con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    var accessToken = jwt.sign({
                        userId: results[0].id,
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });
                    return res.status(200).json({
                        data: results[0],
                        accessToken: accessToken
                    });
                } else {
                    return res.status(500).json({
                        data: results,
                    });
                }
            });
        } else {
            return res.status(500).json({
                data: null
            });
        }
    }

}

module.exports = new UserController();