/**
 * Created by Vibhav on 31/05/2019.
 */
var UniversalFunctions = require("../../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../../Config");
var Controller = require("../../Controllers");
const FormData = require('form-data')

const STUDENTAPI = '/api/v1/students/'
var registerStudent = {
  method: "POST",
  path: STUDENTAPI + "register",
  config: {
    description: "Register student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      var payloadData = request.payload;
      if (!UniversalFunctions.verifyEmailFormat(payloadData.email)) {
        return new Promise((resolve, reject) => {
          reject(
            UniversalFunctions.sendError(
              UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR
                .INVALID_EMAIL_FORMAT
            )
          );
        });
      } else {
        return new Promise((resolve, reject) => {
          Controller.StudentController.registerStudent(payloadData, function (
            err,
            data
          ) {
            if (err) reject(UniversalFunctions.sendError(err));
            else
              resolve(
                UniversalFunctions.sendSuccess(
                  Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                  data
                )
              );
          });
        });
      }
    },
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().valid("MALE", "FEMALE", "N/A"),
        email: Joi.string().email().required(),
        mobile: Joi.string()
          .trim()
          .regex(/^[0-9]{9}$/),
        password: Joi.string()
          .min(8)
          .max(16)
          .required(),
        interestedCourses: Joi.array().items(Joi.string().allow(''))
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var studentLogin = {
  method: "POST",
  path: STUDENTAPI + "login",
  config: {
    description: "Login Student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StudentController.studentLogin(userData, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {

      payload: {
        email: Joi.string().email().required(),
        password: Joi.string()
          .min(8)
          .max(16)
          .required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var getAllStudents = {
  method: "GET",
  path: STUDENTAPI + "getallstudents",
  config: {
    description: "Get Student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      return new Promise((resolve, reject) => {
        Controller.StudentController.getAllStudents(function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {

      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var getStudent = {
  method: "GET",
  path: STUDENTAPI + "getstudent/{id}",
  config: {
    description: "Get Student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      var userData = request.params.id
      return new Promise((resolve, reject) => {
        Controller.StudentController.getStudent(userData, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      params: {
        id: Joi.string().required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var updateStudent = {
  method: "PUT",
  path: STUDENTAPI + "update/student/{id}",
  config: {
    description: "Update Student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StudentController.updateStudent(new FormData(userData), function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      params: {
        id: Joi.string().required()
      },
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().valid("MALE", "FEMALE", "N/A"),
        email: Joi.string().email().required(),
        mobile: Joi.string()
          .trim()
          .regex(/^[0-9]{9}$/),
        interestedCourses: Joi.array().items(Joi.string())
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var updateStudentCourseinterests = {
  method: "PUT",
  path: STUDENTAPI + "update/student/interestedcourses/{id}",
  config: {
    description: "Update Student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      var userData = request.payload;
      var id = request.params.id;
      return new Promise((resolve, reject) => {
        Controller.StudentController.updateStudentCourseinterests(id, userData, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      params: {
        id: Joi.string().required()
      },
      payload: {
        interestedCourses: Joi.string().required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};


const documentUpload = {
  method: "POST",
  path: STUDENTAPI + "upload/documents",
  config: {
    description: "Upload documents Student API",
    tags: ["api", "student"],
    payload: {
      maxBytes: 20715200,
      output: 'file',
      parse: true,
      allow: 'multipart/form-data'
    },
    handler: function (request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StudentController.uploadDocuments(userData, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      payload: {
        file: Joi.any()
          .meta({ swaggerType: 'file' })
          .required()
          .description('Data file'),
        studentId: Joi.string()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var documentDownload = {
  method: "GET",
  path: STUDENTAPI + "download/documents/{id}",
  config: {
    description: "Download documents Student API",
    tags: ["api", "student"],
    handler: function (request, h) {
      var userData = request.params.id
      return new Promise((resolve, reject) => {
        Controller.StudentController.downloadDocuments(userData, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      params: {
        id: Joi.string().required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};
var StudentRoutes = [registerStudent, studentLogin, getAllStudents, getStudent, updateStudent, updateStudentCourseinterests, documentUpload, documentDownload];
module.exports = StudentRoutes;
