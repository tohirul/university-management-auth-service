import dotenv from 'dotenv';
import path from 'path';
// import process from 'process';

dotenv.config({ path: path.join(process.cwd(), '.env') });
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_token: process.env.JWT_ACCESS_TOKEN,
    access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    refresh_token: process.env.JWT_REFRESH_TOKEN,
    refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  },
};

export default config;
