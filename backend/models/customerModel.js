const db = require('./db');

const saveCustomer = async (data) => {
  const [rows] = await db.query(
    `INSERT INTO customers 
    (email, password, confirm password, full_name, dob, gender, mobile, city, state, postal, country,
     address1, address2, id_file, selfie, is_2fa, is_2fa_verified, agreed, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      data.email, data.password, data.confirm_password, data.full_name, data.dob, data.gender,
      data.mobile, data.city, data.state, data.postal, data.country,
      data.address1, data.address2, data.id_file, data.selfie,
      data.is_2fa, data.is_2fa_verified, data.agreed
    ]
  );
  return rows.insertId;
};

module.exports = { saveCustomer };
