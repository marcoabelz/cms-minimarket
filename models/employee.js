'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Store, {foreignKey: "StoreId"})
    }

    static async getEmployeesByPosition(positionQuery) {
      let datas = await Employee.findAll({
          include: {
              model: sequelize.models.Store,
              attributes: ['code']
          },
          where: positionQuery,
          order: [
            ['firstName', 'ASC']
          ]
      })
      return datas
    }

    get age() {
      let year = this.dateOfBirth.toISOString().slice(0, 4)
      let now = new Date().getFullYear()
      return now - +year
    }

    get dateConvert() {
      return new Date(this.dateOfBirth).toISOString().slice(0, 10)
    }

  }
  Employee.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name tidak boleh kosong"
        },
        notNull: {
          msg: "First name tidak boleh kosong"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name tidak boleh kosong"
        },
        notNull: {
          msg: "Last name tidak boleh kosong"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date tidak boleh kosong"
        },
        notNull: {
          msg: "Date tidak boleh kosong"
        },
        ageChecker(value) {
          if(value) {
            let now = new Date().getFullYear()
            let year = value.toISOString().slice(0, 4)
            if((now - +year) < 17) {
              throw new Error(`Usia minimal 18 Tahun!`)
            }
          }
        }
      }
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Education tidak boleh kosong"
        },
        notNull: {
          msg: "Education tidak boleh kosong"
        }
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Position tidak boleh kosong"
        },
        notNull: {
          msg: "Position tidak boleh kosong"
        },
        customValidate(value) {
          if ((this.education === "S3" || this.education === "S2") && (value !== "CEO" && value !== "Manager")){
            throw new Error("Education S3 atau S2 hanya bisa menempati posisi Manager dan CEO")
          }
        }
      }
    },
    StoreId: DataTypes.INTEGER,
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Salary tidak boleh kosong"
        },
        notNull: {
          msg: "Salary tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};