const db = require('./db');

const saveCustomer = async (data) => {
  const [rows] = await db.query(
    `INSERT INTO customers 
<<<<<<< HEAD
    (email, password, confirm password, full_name, dob, gender, mobile, city, state, postal, country,
     address1, address2, id_file, selfie, is_2fa, is_2fa_verified, agreed, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      data.email, data.password, data.confirm_password, data.full_name, data.dob, data.gender,
      data.mobile, data.city, data.state, data.postal, data.country,
      data.address1, data.address2, data.id_file, data.selfie,
      data.is_2fa, data.is_2fa_verified, data.agreed
=======
    (email, password, full_name, dob, gender, mobile, city, state, postal, country,
     address1, address2, id_file, selfie, security_question, security_answer, is_2fa, agreed, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      data.email, data.password, data.full_name, data.dob, data.gender,
      data.mobile, data.city, data.state, data.postal, data.country,
      data.address1, data.address2, data.id_file, data.selfie,
      data.security_question, data.security_answer, data.is_2fa, data.agreed
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
    ]
  );
  return rows.insertId;
};

module.exports = { saveCustomer };
