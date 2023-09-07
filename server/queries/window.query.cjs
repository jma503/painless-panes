/**
 * Implements SQL queries for the "user" table
 */
const pool = require("../modules/pool.cjs");

/** Add a window and return the ID
 *
 * @param {Number} projectId An object containing the ID of the user's project
 * @returns {Object}  The window ID: {"id": <Number>}
 */
const addWindow = async (projectId) => {
  // Query for adding a window - will adjust the values for production
  const QUERY = `INSERT INTO "window" (location_id, current_frame_id, desired_frame_id, project_id) 
                 VALUES (2, 3, 1, $1)
                 RETURNING id;`;
  const queryParams = [projectId.id];
  // const queryParams = 1;

  try {
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
