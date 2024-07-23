'use strict';
const {
  Model
} = require('sequelize');

const {currency_converter} = require('../helpers/index')

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.Employee, { foreignKey:"StoreId"})
    }

    sumSalary(employees) {
      let fees = 0
      employees.forEach(employee => {
          fees += employee.salary;
      })
      return currency_converter(fees)
    }

  }
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama tidak boleh kosong"
        },
        notNull: {
          msg: "Nama tidak boleh kosong"
        }
      }
    },
    code: DataTypes.STRING, //ini ga divalidasi, karena dapet dari hooks
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location tidak boleh kosong"
        },
        notNull: {
          msg: "Location tidak boleh kosong"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category tidak boleh kosong"
        },
        notNull: {
          msg: "Category tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
    hooks: {
      beforeValidate: (data, options) => {
        if(data.category === "Mart") {
          data.code = `001-${new Date().getTime()}`
        } else if (data.category === "Midi") {
          data.code = `002-${new Date().getTime()}`
        } else {
          data.code = `003-${new Date().getTime()}`
        }
      }
    }
  }); 
  return Store;
};