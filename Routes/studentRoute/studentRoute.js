/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require("../../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../../Config");
var Controller = require("../../Controllers");
const STUDENTAPI = '/api/student/v1/'
var registerStudent = {
  method: "POST",
  path: STUDENTAPI+"register/",
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
        interestedCourses: Joi.array().items(Joi.number())
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
  path: STUDENTAPI+"login/",
  config: {
    description: "Login Student API",
    tags: ["api", "student"],
    handler: function(request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StudentController.studentLogin(userData, function(
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
  path: STUDENTAPI+"getallstudents/",
  config: {
    description: "Get Student API",
    tags: ["api", "student"],
    handler: function(request, h) {
      return new Promise((resolve, reject) => {
        Controller.StudentController.getAllStudents(function(
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
  path: STUDENTAPI+"getstudent/{id}",
  config: {
    description: "Get Student API",
    tags: ["api", "student"],
    handler: function(request, h) {
      var userData = request.params.id
      return new Promise((resolve, reject) => {
        Controller.StudentController.getStudent(userData,function(
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
  path: STUDENTAPI+"update/student/{id}",
  config: {
    description: "Update Student API",
    tags: ["api", "student"],
    handler: function(request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StudentController.updateStudent(userData, function(
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
      params:{
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
        interestedCourses: Joi.array().items(Joi.number())
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

var StudentRoutes = [registerStudent,studentLogin, getAllStudents, getStudent,updateStudent];
module.exports = StudentRoutes;
