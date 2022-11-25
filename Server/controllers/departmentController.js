const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handleFactory');
const Department = require('../models/departmentModel');

exports.newDepartment = factory.createOne(Department);

exports.getAllDepartments = factory.getAll(Department);

exports.updateDepartment = factory.updateOne(Department);

exports.getDepartment = factory.getOne(Department);

exports.getTree = factory.getTree(Department);
