module.exports = async function (req, res, next) {
  let token;
  token = await sails.helpers.recoverToken(req).tolerate((ex) => {
    console.error(ex);
    return { err: ex.code };
  });

  if (token && token.err) {
    return res.json(401, token);
  }

  let result = await sails.helpers.verifyToken(token, req).tolerate((ex) => {
    return { err: ex.code };
  });
  if (result && result.err) {
    return res.json(401, result);
  } else {
    next();
  }
};
