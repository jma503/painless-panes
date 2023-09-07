/**
 * Implements SQL queries for the "window" table
 */
const pool = require("../modules/pool.cjs");

/** Add a window and return the ID -- JUST the window 
 * (via hash upload to S3 -- TODO). Returns the ID to enable
 * PUTs with additional data
 *
 * @param {Number} projectId An object containing the ID of the user's project
 * @returns {Object}  The window ID: {"id": <Number>}
 */
const addWindow = async (projectId) => {
  // Query for adding a window - will adjust the values for production
  // We decided that this will be a POST, then PUTs to update the various params
  const QUERY = `INSERT INTO "window" (project_id) 
                 VALUES ($1)
                 RETURNING id;`;
  const queryParams = [projectId.id];

  try {
    // the result is the returned ID of the window
    const result = await pool.query(QUERY, queryParams);
    console.log("Returning new window:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addWindow,
};

// addWindow({ id: 1 }).then(console.log);
