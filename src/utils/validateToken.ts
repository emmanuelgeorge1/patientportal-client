import jwt_decode from 'jwt-decode';

const validateToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const exp = JSON.parse(JSON.stringify(jwt_decode(token))).exp;

  console.log('exp::' + exp);
  console.log('Date.now()::' + Date.now());

  if (exp < Date.now()) {
    return true;
  } else {
    return false;
  }
};

export default validateToken;
