const pool = require("./db");

exports.createDeposit = async (depositData) => {
    let {
      deposit_id,
      amount,
      term,
      apy,
      payout_type,
      start_date,
      maturity_date,
      projected_interest,
      projected_payout,
    } = depositData;

     // ✅ Clean input values
  amount = parseFloat(String(amount).replace(/[^0-9.]/g, "")) || 0; // "$5,000.00" -> 5000.00
  term = parseInt(String(term).replace(/\D/g, "")) || 0;             // "3 mo" -> 3
  apy = parseFloat(String(apy).replace(/[^0-9.]/g, "")) || 0;        // "3.00%" -> 3.00
  

    const [result] = await pool.query(
      `INSERT INTO time_deposits
      (deposit_id, amount, term, apy, payout_type, start_date, maturity_date, projected_interest, projected_payout)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        deposit_id,
        amount,
        term,
        apy,
        payout_type,
        start_date,
        maturity_date,
        projected_interest,
        projected_payout,
      ]
    );

    return result.insertId; // return new row ID
  };

  // ✅ Get all deposits
exports.getDeposits = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM time_deposits ORDER BY created_at DESC'
  );
  return rows;
};