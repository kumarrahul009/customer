--abcd_bank

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS ABCD_DB;
USE ABCD_DB;

-- 2. Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password  VARCHAR(200),
  full_name VARCHAR(255),
  dob DATE,
  gender VARCHAR(20),
  mobile VARCHAR(15),
  city VARCHAR(100),
  state VARCHAR(100),
  postal VARCHAR(20),
  country VARCHAR(100),
  address1 TEXT,
  address2 TEXT,
  id_file LONGTEXT,
  selfie LONGTEXT,
  security_question VARCHAR(255),
  security_answer VARCHAR(255),
  is_2fa BOOLEAN,
  agreed BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Timedeposit Table
CREATE TABLE IF NOT EXISTS timedeposit (
   id INT AUTO_INCREMENT PRIMARY KEY,
  deposit_id VARCHAR(20) UNIQUE,
  amount DECIMAL(12,2),
  term INT, -- in months
  apy DECIMAL(5,2),
  payout_type ENUM('atMaturity','monthly'),
  start_date DATE,
  maturity_date DATE,
  projected_interest DECIMAL(12,2),
  projected_payout DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

