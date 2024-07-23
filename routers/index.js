const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')


// define the home page route
router.get('/', Controller.homepage)

router.get('/stores', Controller.homepage)

router.get('/stores/add', Controller.showFormAddStore)
router.post('/stores/add', Controller.addStorePost)

router.get('/stores/:storeId', Controller.detailStore)

router.get('/stores/:storeId/employees/add', Controller.showFormAddEmployee)
router.post('/stores/:storeId/employees/add', Controller.addEmployeePost)

router.get('/stores/:storeId/employees/:employeesId/edit', Controller.formEditEmployee)
router.post('/stores/:storeId/employees/:employeesId/edit', Controller.editEmployeePost)

router.get('/stores/:storeId/employees/:employeesId/delete', Controller.deleteEmployeeById)
router.get('/employees', Controller.getAllEmployee)

module.exports = router