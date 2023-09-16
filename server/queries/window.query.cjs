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
  const queryParams = [projectId];

  try {
    // the result is the returned ID of the window
    const result = await pool.query(QUERY, queryParams);
    console.log("Returning new window:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get all windows for a project
 * @param {Number} projectId The project's ID
 * @returns {Object} The project row of all windows
 */
const getListOfWindows = async (projectId) => {
  const queryString = `SELECT * FROM "window" WHERE project_id = $1 ORDER BY id;`;
  const queryParams = [projectId];
  try {
    const result = await pool.query(queryString, queryParams);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update the window dimensions of a project
 * @param {Number} projectId The project's ID
 * @returns {Object} The project row of all windows
 */

const updateWindow = async (windowId, param, value) => {
  const valueToSet = Object.values(value)[0];
  console.log("SETTING", valueToSet);
  const QUERY = `UPDATE "window"
                 SET ${param} = $1
                 WHERE id = $2;`;
  const queryParams = [valueToSet, windowId];
  try {
    const result = await pool.query(QUERY, queryParams);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addWindow,
  getListOfWindows,
  updateWindow,
};
