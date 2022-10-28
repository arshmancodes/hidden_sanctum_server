const db = require('../utils/database');


exports.postPackage = (req, res, next) => {
    db.execute('INSERT INTO packages(amount, currency, package, duration) VALUES(?, ?, ?, ?) ', [req.body.amount, req.body.currency, req.body.package, req.body.duration]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Package has been posted Successfully",
            success : true,
        })
    }).catch((err) => {
        res.status(200).json({
            message: "An Error occured while posting the Package Details",
            success: false,
        })
    })
}

exports.deletePackage = (req, res, next) =>{
    db.execute("DELETE from packages WHERE id=?", [req.body.id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "The package has been deleted successfully",
            success: true,
        })
    }).catch((err) => {
        res.status(200).json({
            message: "There was an issue deleting the package",
            success: false,
        })
    })
}

exports.updatePackage = (req, res, next) => {
    db.execute('UPDATE packages SET amount=?, currency=?, package=?, duration=? WHERE id=?', [req.body.amount, req.body.currency, req.body.package, req.body.duration, req.body.id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "The Package has been updated",
            success: true,
        })
    }).catch((err) => {
        res.status(200).json({
            error : err,
            message: "There was an issue updating the package details",
            success: false,
        })
    })   
}

exports.viewPackage = (req, res, next) => {
    db.execute('SELECT * from packages').then(([rows, fieldData]) => {
        res.status(200).json({
            message: "The pacakges data has been displayed",
            data: rows,
            success: true,
        })
    }).catch((err) => {
        res.status(200).json({
            message: "There was an issue Fetching Data",
            success: false,
        })
    })
}