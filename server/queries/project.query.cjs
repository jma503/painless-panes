const pool = require("../modules/pool.cjs");

/** Add a user's zip code
 * @param {Object} project An object containing the user's zip code
 * @returns {Object} The zip code row
 */
const addZipCode = async (project) => {
  const queryString =
    'INSERT INTO "project" (zip, user_id) VALUES ($1, $2) RETURNING *;';
  const queryParams = [project.zipCode, project.userId];
  try {
    const result = await pool.query(queryString, queryParams);
    console.log("Returning user zip code:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addZipCode,
};

addZipCode({ zipCode: "53349", id: 1 }).then(console.log);
