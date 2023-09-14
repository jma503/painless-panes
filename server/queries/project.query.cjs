const pool = require("../modules/pool.cjs");
const windowQuery = require("./window.query.cjs");

/**
 * Get the latest project for a user
 * @param {Number} userId The user's ID
 * @returns {Object} The project row
 */
const lookupLatestProject = async (userId) => {
  const queryString = `
    SELECT * FROM project WHERE id = (
      SELECT MAX(id) FROM project WHERE user_id = $1
    );
  `;
  const queryParams = [userId];
  try {
    const result = await pool.query(queryString, queryParams);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get all projects for a user
 * @param {Number} userId The user's ID
 * @returns {Object} The project row
 */

const getAllProjects = async (userId) => {
  const queryString = `
    SELECT * FROM project WHERE user_id = $1
    );
  `;
  const queryParams = [userId];
  try {
    const result = await pool.query(queryString, queryParams);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Create a new project for a user and return the ID
 * @param {Number} userId The user's ID
 * @returns {Object} The project row
 */
const addProject = async (userId) => {
  const queryString = `
    INSERT INTO "project" (user_id) VALUES ($1) RETURNING id;
  `;
  const queryParams = [userId];
  try {
    const result = await pool.query(queryString, queryParams);
    const project = result.rows[0];
    console.log("New project created:", project);

    // Create the starting window for the project. Other windows will be created every
    // time the user Clicks "Add New Window" on the frontend
    windowQuery.addWindow(project.id);

    return project;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update the zip code for a project
 * @param {Object} project A project object ontaining the project ID and the zip code
 *    {id: <Number>, zip: <String>}
 */
const updateZipCode = async (project) => {
  const queryString = `
    UPDATE "project" SET zip=$2 WHERE id = $1;
  `;
  const queryParams = [project.id, project.zipCode];

  try {
    const result = await pool.query(queryString, queryParams);
    console.log(
      `Updated project ${project.id} with zip code ${project.zipCode}`
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  lookupLatestProject,
  addProject,
  updateZipCode,
  getAllProjects,
};
