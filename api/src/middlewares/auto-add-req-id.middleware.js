export default function (req, res, next) {
  const originalSend = res.json;

  res.json = function(json) {
    json = {
      reqid: req.uuid,
      ...json
    };

    return originalSend.call(this, json);
  }

  next();
}