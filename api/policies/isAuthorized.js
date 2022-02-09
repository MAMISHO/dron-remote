module.exports = async function (req, res, next) {
  var token;
  //Check if authorization header is present
  /*if(req.headers && req.headers.authorization) {
		//authorization header is present
		var parts = req.headers.authorization.split(' ');
		if(parts.length == 2) {
			var scheme = parts[0];
			var credentials = parts[1];

			if(/^Bearer$/i.test(scheme)) {
				token = credentials;
			}
		} else {
			return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
		}
	} else {
		//authorization header is not present
		return res.json(401, {err: 'No Authorization header was found'});
	}*/
  try {
    token = await sails.helpers.recoverToken(req);
  } catch (ex) {
    return res.json(401, { err: ex });
  }
  jwToken.verify(token, async function (err, decoded) {
    if (err) {
      req.session.destroy();
      return res.json(401, { err: 'Invalid token' });
    }
    const decodedUser = decoded.data;
    if (!decodedUser) {
      return res.json(401, { err: 'Invalid user' });
    }
    if (!req.session.user) {
      const user = await User.findOne({ uuid: decodedUser.uuid });
      if (user && user.status) {
        req.session.user = user;
      } else {
        req.session.destroy();
        return res.json(401, { err: 'Invalid user' });
      }
    }
    next();
  });
};
