const db = require('../utils/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');



exports.checkUser = (req, res, next) => {
    db.execute("SELECT * FROM users where username = ?", [req.body.username]).then(([rows, fieldData]) => {
        if(rows.length > 0)
        {
            res.status(502).json({
                message: "The username already exists",
                success : false,
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "The username is available",
                data: rows,
            })
        }
        
    })
}

exports.postAuth = (req, res, next) => {


    var name = req.body.name;
    var email_address = req.body.email_address;
    var password = req.body.password;
    var gender = req.body.gender;
    var fcmToken = req.body.fcmToken;

    const salt = genSaltSync(10);
    password = hashSync(req.body.password, salt);

    db.execute("SELECT * FROM users where email_address =?", [email_address]).then(([rows, fieldData]) => {
        if(rows.length > 0)
        {
            res.status(500).json({
                success: false,
                message: "Email Already Exists",
            });
        }
        else
        {
            db.execute('INSERT INTO users(name, email_address, password, gender, fcmToken, address, username, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, email_address, password, gender, fcmToken, req.body.address, req.body.username, req.body.phone]).then(([rows, fieldData]) => {
                res.status(200).json({
                    success: true,
                    data : rows,
                    
                })
            }).catch(err => {
                res.status(500).json({
                    success : false,
                    message: err,
                })
            })
        }
    })

    

}

exports.getAuth = (req, res, next) => {

    db.execute('SELECT * from users').then(([rows, fieldData]) => {
        res.status(200).json(rows);
    }).catch(err => {
        res.status(502).json({
            error: err,
            success: false,
        })
    })
}

exports.login = (req, res, next) => {

    var email_address = req.body.email_address;
    var password = req.body.password;


    db.execute('SELECT * FROM users WHERE email_address=?', [req.body.email_address]).then(([rows, fieldData]) => {
        if(rows.length > 0) 
        {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if(validPassword)
            {
                res.status(200).json({
                    message : 'User logged in Successfully',
                    success: true,
                    data: rows[0],
                    
                })
            }
            else
            {
                res.status(500).json({
                    success: false,
                    message: "User Login failed!, Invalid Username or Password",
                })
            }
        }
    })
}