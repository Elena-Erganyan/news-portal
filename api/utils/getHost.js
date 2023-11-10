const getHost = (req) => {
  return (
    (process.env.NODE_ENV === "prod" ? "https" : req.protocol) + "://" + 
    (req.hostname === "localhost" ? "localhost:5173" : req.get("host"))
  );
};


module.exports = getHost;