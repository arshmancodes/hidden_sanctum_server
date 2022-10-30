const express = require('express');
const db = require('../utils/database');


exports.viewPaymentData = (req, res, next) => {
    db.execute('SELECT * from payments').then(([rows, fieldData]) => {
        res.status(200).json({
            message: "The Data has been displayed",
            data: rows,
            success: true,
        })
    }).catch((err) => {
        res.status(200).json({
            message: "There was an error while Viewing the Payment Data",
            error: err,
            success : false,
        })
    })
}


exports.postPayment = (req, res, next) => {
    db.execute('INSERT into payments(email, username, package_name, amount, next_payment) VALUES(?, ?, ?, ?, ?)', [req.body.email, req.body.username, req.body.package_name, req.body.amount, req.body.next_payment]).then(([rows, fieldData]) => {
        db.execute('UPDATE users SET isPremium=? WHERE email=?', [1, req.body.email]).then(([rows, fieldData]) => {
            res.status(200).json({
                message: "The Payment data has been added",
                success: true,
                data: rows,
            })
        }).catch((err) => {
            res.status(200).json({
                message: "There was an issue updating the User Status",
                success: false
            })
        })
    }).catch((err) => {
        res.status(200).json({
            message: "There was an issue in posting the Payment",
            error: err,
            success: false,
        })

    })
}
exports.deletePayment = (req, res, next) => {
    db.execute("DELETE from payments WHERE id=?", [req.body.id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "The Data has been deleted Successfully",
            success : true,

        })
    }).catch((err) => {
        res.status(200).json({
            message: "The data has not been deleted",
            success : false,
            error: err
        })
    })
}

exports.updatePayment = (req, res, next) => {
    db.execute('UPDATE payments SET email=?, username=?, package_name=?, amount=?, next_payment=? WHERE id=?', [req.body.email, req.body.username, req.body.package_name, req.body.amount, req.body.next_payment, req.body.id]).then(([rows, fieldData])=> {
        res.status(200).json({
            message: "The Payment data has been updated Successfully",
            data: rows,
            success: true,
        })
    }).catch((err) => {
        res.status(200).json({
            message: "The data has not been updated",
            success: false,
            errror: err
        })
    })
}
