const pool = require("../modules/pool.cjs");

const getLocations = async () => {
  const queryString = "SELECT * FROM location;";

  try {
    const result = await pool.query(queryString);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getLocations,
};
getLocations().then(console.log);
