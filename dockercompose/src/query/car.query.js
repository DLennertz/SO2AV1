const QUERY = {
  SELECT_CARS: "SELECT * FROM cars WHERE deleted = false ORDER By name DESC",
  SELECT_CAR: "SELECT * FROM cars WHERE id = ? AND deleted = false",
  CREATE_CAR:
    "INSERT INTO cars(name,base_price,per_day_rate,plate,color,brand_id) VALUES(?,?,?,?,?,?)",
  UPDATE_CAR:
    "UPDATE cars SET name = ?, base_price = ?, per_day_rate = ?, plate = ?, color = ?, available = ?, brand_id  = ? WHERE id = ?",
  DELETE_CAR: "UPDATE cars SET deleted = true WHERE id = ?",
  RENT_CAR: "UPDATE cars SET available = false, date_of_rent = ? WHERE id = ?",
  RETURN_CAR:
    "UPDATE cars SET available = true, date_of_rent = null WHERE id = ?",
  SELECT_AVAILABLE_CARS:
    "SELECT * FROM cars where available = true AND deleted = false ORDER By name DESC",
  SELECT_UNAVAILABLE_CARS:
    "SELECT * FROM cars where available = false AND deleted = false ORDER By name DESC"
};

export default QUERY;
