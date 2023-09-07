/**
 * Implements SQL queries for the "frame" table
 */
const pool = require("../modules/pool.cjs");

const getFrames = async () => {
    const queryString = "SELECT * FROM frame;";
  
    try {
      const result = await pool.query(queryString);
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  module.exports = {
    getFrames,

  };
