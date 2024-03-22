const studentModel = require('../model/studentModel');
const encryptor = require('simple-encryptor')('123456789brbrbrbrbrbbr');

module.exports.createStudentDBService = async (studentDetails) => {
  try {
    const encryptedPassword = encryptor.encrypt(studentDetails.password);

    const newStudent = new studentModel({
      firstname: studentDetails.firstname,
      lastname: studentDetails.lastname,
      email: studentDetails.email,
      role: studentDetails.role,
      phoneNumber: studentDetails.phoneNumber,
      password: encryptedPassword,
    });

    const savedStudent = await newStudent.save();
    return savedStudent ? true : false;
  } catch (error) {
    console.error("Error while saving student data: ", error);
    throw new Error("Failed to save student data.");
  }
};

module.exports.loginStudentDBService = async (studentDetails) => {
  try {
    const student = await studentModel.findOne({ email: studentDetails.email });
    if (student) {
      const decryptedPassword = encryptor.decrypt(student.password);
      if (decryptedPassword === studentDetails.password) {
        return { status: true, msg: "Student validated Successfully"};
      } else {
        throw { status: false, msg: "Student validation failed" };
      }
    } else {
      throw { status: false, msg: "Student not found" };
    }
  } catch (error) {
    console.error("Error while logging in student: ", error);
    throw { status: false, msg: "Invalid Data" };
  }
};

module.exports.updateStudentDBService = async (id, updateDetails) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(id, updateDetails, { new: true });
    if (updatedStudent) {
      return updatedStudent;
    } else {
      throw new Error("Failed to update student.");
    }
  } catch (error) {
    console.error("Error while updating student: ", error);
    throw new Error("Failed to update student.");
  }
};
