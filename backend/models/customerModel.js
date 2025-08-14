const db = require('./db'); 

async function saveCustomer(data) {
  const sql = `
    INSERT INTO customers (
      email, password, full_name, dob, gender, mobile, city, state, postal, country,
      address1, address2, id_file, selfie, security_question, security_answer,
      is_2fa, agreed, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    data.email,
    data.password,
    data.full_name,
    data.dob,
    data.gender,
    data.mobile,
    data.city,
    data.state,
    data.postal,
    data.country,
    data.address1,
    data.address2,
    data.id_file || null,
    data.selfie || null,
    data.security_question || null,
    data.security_answer || null,
    data.is_2fa || 0,
    data.agreed || 0
  ];

  const [result] = await db.query(sql, values);
  return result.insertId;
}

module.exports = { saveCustomer };
