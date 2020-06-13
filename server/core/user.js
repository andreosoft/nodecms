const usersId = {};
const usersToken = {};

class User {
  constructor(id, login, role, token = '', date = (new Date().getTime() / 1000)) {
    this.id = id;
    this.login = login;
    this.role = role;
    this.token = token;
    this.date = date;
    this.connections = [];
  }
}

setInterval(() => {
  const now = new Date().getTime() / 1000;
  const per = 30 * 60;
  for (const key in usersToken) {
    if ((now - usersToken[key].date) > per) {
      delete usersToken[key];
    }
  }
}, 60 * 1000);

const init = async function (req, res, next) {
  req.user = await getUser(req, res)
  next()
};

const getUser = function (req, res) {
  return new Promise(async resolve => {
    if (req.authorization) {
      const token = req.authorization;
      let user = usersToken[token];
      if (user) {
        user.date = new Date().getTime() / 1000;
        return resolve(user);
      } else {
        user = await findByToken(token);
        if (user) {
          return resolve(user);
        }
      }
    }
    return resolve(new User(0, '', 0));
  });
}

const findByToken = function (token) {
  return new Promise(resolve => {
    let q = `SELECT users.* FROM users WHERE token = ? AND status = 2 LIMIT 1`;
    db.query(q, [token], (err, result, fields) => {
      if (err) throw err;
      if (result.length == 1) {
        const u = result[0];
        const user = new User(u.id, u.login, u.role, u.token);
        usersToken[token] = user;
        return resolve(user);
      }
      return resolve(false);
    });
  });
}


const logout = function (req, res) {
  if (req.user) {
    delete usersToken[req.user.token];
    let q = `UPDATE users SET token = '' WHERE id = ?`;
    db.query(q, [req.user.id], (err, result, fields) => {
      if (err) throw err;
    });
    return true;
  }
  return false;
}

const roleAuth = function (req, res, next) {
  req.can = function (role, req, res, next) {
    return new Promise(resolve => {
      if (req.user.role < role) {
        res.status(403).json({ error: 'not allow' }).end();
        return resolve(false)
      }
      return resolve(true)
    })
  }
  req.only = function (id, req, res, next) {
    return new Promise(resolve => {
      if (req.user.id != id) {
        res.status(403).json({ error: 'not allow' }).end();
        return resolve(false)
      }
      return resolve(true);
    })
  }
  next();
}

exports.usersToken = usersToken
exports.logout = logout
exports.init = init
exports.roleAuth = roleAuth