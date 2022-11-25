const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    return res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (req.body.managedBy) {
      await Model.findByIdAndUpdate(req.body.managedBy, {
        $push: { manages: doc._id }
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate(
      { name: req.body.oldName },
      {
        name: req.body.name,
        desc: req.body.desc,
        manages: req.body.manages,
        managedBy: req.body.managedBy
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id)
      .populate([
        {
          path: 'manages',
          model: 'Department',
          select: '-__v -desc -managedBy',
          populate: {
            path: 'manages',
            select: '-__v -desc -managedBy'
          }
        }
      ])
      .select('-__v -desc -managedBy');

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getTree = Model =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findOne({
      name: 'Chief Executive Officer'
    })
      .populate([
        {
          path: 'manages',
          model: 'Department',
          select: '-__v -desc -managedBy',
          populate: {
            path: 'manages',
            select: '-__v -desc -managedBy'
          }
        }
      ])
      .select('-__v -desc -managedBy');

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    doc = JSON.parse(JSON.stringify(doc).replaceAll('manages', 'children'));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
