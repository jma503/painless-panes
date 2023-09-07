const pool = require("../modules/pool.cjs");

//Add a user's zip code

const addZipCode = async (user) => {
    const queryString = 'INSERT INTO "project" (zip) VALUES ($1) RETURNING *;';  
    const queryParams = [user.zipCode];
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
  