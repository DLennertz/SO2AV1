const QUERY = {
  SELECT_BRANDS: "SELECT * FROM brands ORDER By name DESC",
  SELECT_BRAND: "SELECT * FROM brands WHERE id = ?",
  CREATE_BRAND: "INSERT INTO brands(name) VALUES(?)",
  UPDATE_BRAND: "UPDATE brands SET name = ? WHERE id = ?",
  DELETE_BRAND: "DELETE FROM brands WHERE id = ?"
};

export default QUERY;
