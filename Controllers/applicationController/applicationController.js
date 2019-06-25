/**
 * Created by Vibhav
 */
var UniversalFunctions = require('../../Utils/UniversalFunctions');
var async = require("async");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var SUCESS = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS;
const SERVICES = require('../../DB')
const APPLICATION_STATUS = UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.APPLICATION_STATUS.STARTED

const createApplication = function (payloadData, callback) {
    let applicationData = {
        studentId: payloadData.studentId,
        courseId: payloadData.courseId
    }
    SERVICES.APPLICATIONSERVICE.createRecord(applicationData, function (err, data) {
        if (err) return callback(err)
        else {
            applicationData = data
            const criteria = { _id: applicationData._id }
            SERVICES.APPLICATIONSERVICE.updateRecord(criteria, { $push: { status: { status: APPLICATION_STATUS } } }, {}, (err, data) => {

                return callback(null, data)
            })
            console.log('[data]', applicationData)
        }
    })
}
const getApplication = function (payloadData, callback) {
    var userData = payloadData
    const criteria = { studentId: payloadData }
    const projections = {
        'password': 0,
        '__v': 0
    }
    var select = ""
    var populate = [{
        path: "studentId",
        match: {},
        select: select,
        options: { lean: true }
    }, {
        path: "courseId",
        match: {},
        select: select,
        options: { lean: true }
    }]
    SERVICES.APPLICATIONSERVICE.populatedRecords(criteria, projections, populate, {}, {}, (err, data) => {
        if (err) return callback(err)

        else if (data && data.length > 0) return callback(null, data)

        else return callback(ERROR.USER_NOT_FOUND)
    })
}

const getAllApplication = function (payloadData, callback) {
    var userData = payloadData
    const criteria = {}
    const projections = {
        'password': 0,
        '__v': 0
    }

    var select = ""
    var populate = [{
        path: "studentId",
        match: {},
        select: select,
        options: { lean: true }
    }, {
        path: "courseId",
        match: {},
        select: select,
        options: { lean: true }
    }]
    SERVICES.APPLICATIONSERVICE.populatedRecords(criteria, projections, populate, {}, {}, (err, data) => {
        if (err) return callback(err)

        else if (data && data.length > 0) return callback(null, data)

        else return callback(ERROR.USER_NOT_FOUND)
    })
}

const updateApplication = function (payloadData, callback) {
    let userData = payloadData;
    console.log('[DATA]',userData)
    async.series([
        function (cb) {
            const criteria = { _id: userData.studentId }
            SERVICES.STUDENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
                if (err) return cb(err)
                else if (data && data.length > 0) return cb()
                else cb(ERROR.USER_NOT_FOUND)
            })
        },
        function (cb) {
            const criteria = { _id: userData.courseId }
            SERVICES.COURSESERVICE.getRecord(criteria, {}, {}, (err, data) => {
                if (err) return cb(err)
                else if (data && data.length > 0) return cb()
                else cb(ERROR.NOT_FOUND)
            })
        },
        function (cb) {
            const criteria = { courseId: userData.courseId }
            SERVICES.APPLICATIONSERVICE.updateRecord(criteria, { $push: { status: { status: userData.status } } }, {},function (err, data) {
                if (err) cb(err)
                else {
                    userData = data
                    cb(null, userData)
                }
            })
        }
    ], function (err, result) {
        if (err) return callback(err)
        else return callback(null, userData)
    })
}


module.exports = {
    getAllApplication: getAllApplication,
    getApplication: getApplication,
    updateApplication: updateApplication,
    createApplication: createApplication
};
