
import jwt from 'jsonwebtoken';
import config from '../config/config';

// generate token for newly create user
exports.makeToken = (id, email, isAdmin, firstName, lastName, status) => {
  const role = isAdmin ? 'Admin' : 'User';
  const token = jwt.sign({
    id, email, role, firstName, lastName, status,
  }, config.secret, { expiresIn: '48h' });
  return token;
};

exports.verifyToken = token => jwt.decode(token, { complete: true, json: true });
