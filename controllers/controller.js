const {Store, Employee} = require('../models')
const {currency_converter} = require('../helpers')

class Controller {
    static async homepage(req, res) {
        try {
            let datas = await Store.findAll()
            res.render('homepage', {datas, title: 'Homepage'})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async showFormAddStore(req, res) {
        try {
            res.render('formAddStore', {title: 'Form Add'})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async addStorePost(req, res) {
        try {
            let {name, location, category} = req.body
            await Store.create({name, location, category})
            res.redirect('/stores')
        } catch (error) {
            let errors = error.errors.map(perError => perError.message)
            res.send(errors)
        }
    }

    static async getAllEmployee(req, res) {
        try {
            let positionQuery = req.query
            let datas = await Employee.getEmployeesByPosition(positionQuery)

            res.render('employeeList', {title: "Employee List", datas, currency_converter})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async detailStore(req, res) {
        try {
            let {deletedData} = req.query
            let {storeId} = req.params
            let datas = await Store.findByPk(storeId, {
                include: {
                    model: Employee
                }
            })
            // console.log(datas);

            //ITUNG TOTAL GAJI ADA DI MODEL STORE, TAPI BISA DI CONTROLLER JUGA
            // console.log(datas.Employees);
            // let fees = 0
            // datas.Employees.forEach(employee => {
            //     fees += employee.salary;
            // })
            res.render('detailStore', {title: 'Detail Store', datas, currency_converter, deletedData})
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteEmployeeById(req, res) {
        try {
            let {storeId, employeesId} = req.params
            // console.log(storeId, employeesId);
            let deletedData = await Employee.findByPk(employeesId)
            await Employee.destroy({
                where: {
                    id: employeesId
                }
            })
            let deletedUser = `${deletedData.dataValues.firstName} ${deletedData.dataValues.lastName}`;
            res.redirect(`/stores/${storeId}?deletedData=${deletedUser}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showFormAddEmployee(req, res) {
        try {
            let {storeId} = req.params
            let datas = await Store.findByPk(storeId)
            // console.log(datas.dataValues);
            let educations = ['SMA', 'S1', 'S2', 'S3']
            let positions = ['Staff', 'Manager', 'Supervisor', 'CEO']
            res.render('formAddEmployee', {title: "Form Add Employee", datas, educations, positions})
        } catch (error) {
            res.send(error)
        }
    }

    static async addEmployeePost(req, res) {
        try {
            let{storeId} = req.params
            let StoreId = storeId
            let {firstName, lastName, dateOfBirth, education, position, salary} = req.body
            await Employee.create({firstName, lastName, dateOfBirth, education, position, salary, StoreId})
            res.redirect(`/stores/${storeId}`)
        } catch (error) {
            console.log(error);
            let errors = error.errors.map(error => error.message)
            res.send(errors)
        }
    }

    static async formEditEmployee(req, res) {
        try {
            let {employeesId} = req.params
            // console.log(employeesId);
            let datas = await Employee.findByPk(employeesId, {
                include: {
                    model: Store
                },
                attributes: ['id', 'firstName', 'lastName', 'dateOfBirth', 'education', 'position', 'salary']
            })
            // console.log(datas);
            let educations = ['SMA', 'S1', 'S2', 'S3']
            let positions = ['Staff', 'Manager', 'Supervisor', 'CEO']
            res.render('formEditEmployee', {title: 'Form Edit Employee', datas, educations, positions})
        } catch (error) {
            res.send(error)
        }
    }

    static async editEmployeePost(req, res) {
        try {
            let {employeesId, storeId} = req.params
            let {firstName, lastName, dateOfBirth, education, position, salary} = req.body
            console.log(employeesId, storeId);
            await Employee.update(
                {firstName, lastName, dateOfBirth, education, position, salary},
                {
                    where: {
                        id: employeesId
                    }
                }
            );
            res.redirect(`/stores/${storeId}`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller