const router = require('express').Router();
const departmentController = require('./../controllers/departmentController');

router
  .route('/departments')
  .get(departmentController.getAllDepartments)
  .post(departmentController.newDepartment)
  .patch(departmentController.updateDepartment);

router.route('/departments/tree').get(departmentController.getTree);

router.route('/departments/:id').get(departmentController.getDepartment);

module.exports = router;
