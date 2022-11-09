import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/car.query.js";
import HttpStatus from "../util/HttpStatus.js";

export const getCars = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching cars`);
  database.query(QUERY.SELECT_CARS, (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No cars found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "cars retrieved",
            { cars: results }
          )
        );
    }
  });
};

export const getAvailableCars = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching available cars`);
  database.query(QUERY.SELECT_AVAILABLE_CARS, (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No cars found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "cars retrieved",
            { cars: results }
          )
        );
    }
  });
};

export const getUnavailableCars = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching cars`);
  database.query(QUERY.SELECT_UNAVAILABLE_CARS, (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No cars found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "cars retrieved",
            { cars: results }
          )
        );
    }
  });
};

export const createCar = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating car`);
  database.query(
    QUERY.CREATE_CAR,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              "Error occurred"
            )
          );
      } else {
        const car = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date()
        };
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              "Car created",
              { car }
            )
          );
      }
    }
  );
};

export const getCar = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching car`);
  database.query(QUERY.SELECT_CAR, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Car id = ${req.params.id} not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Car retrieved",
            results[0]
          )
        );
    }
  });
};

export const updateCar = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching car`);
  database.query(QUERY.SELECT_CAR, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Car id = ${req.params.id} not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating car`);
      database.query(
        QUERY.UPDATE_CAR,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  "Car updated",
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  "Error occured"
                )
              );
          }
        }
      );
    }
  });
};

export const deleteCar = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting car`);
  database.query(QUERY.DELETE_CAR, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Car Deleted`,
            results
          )
        );
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Car id = ${req.params.id} not found`
          )
        );
    }
  });
};

export const rentCar = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching car`);
  database.query(QUERY.SELECT_CAR, [req.params.id], (error, results) => {
    if (!results[0] || results[0].available != true) {
      res
        .status(HttpStatus.BAD_REQUEST.code)
        .send(
          new Response(
            HttpStatus.BAD_REQUEST.code,
            HttpStatus.BAD_REQUEST.status,
            `Car id = ${req.params.id} unavailable`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, renting car`);
      database.query(
        QUERY.RENT_CAR,
        [new Date(), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  "Car rented",
                  results
                )
              );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  "Error occured"
                )
              );
          }
        }
      );
    }
  });
};

export const returnCar = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching car`);
  database.query(QUERY.SELECT_CAR, [req.params.id], (error, results) => {
    if (!results[0] || results[0].available != false) {
      res
        .status(HttpStatus.BAD_REQUEST.code)
        .send(
          new Response(
            HttpStatus.BAD_REQUEST.code,
            HttpStatus.BAD_REQUEST.status,
            `Car id = ${req.params.id} unavailable`
          )
        );
    } else {
      const car = results;
      logger.info(`${req.method} ${req.originalUrl}, returning car`);
      database.query(QUERY.RETURN_CAR, [req.params.id], (error, results) => {
        if (!error) {
          const diffTime = Math.abs(new Date() - new Date(car[0].date_of_rent));
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          res
            .status(HttpStatus.OK.code)
            .send(
              new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                "Car returned",
                [{ Total: diffDays * car[0].per_day_rate + car[0].base_price }]
              )
            );
        } else {
          logger.error(error.message);
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(
              new Response(
                HttpStatus.INTERNAL_SERVER_ERROR.code,
                HttpStatus.INTERNAL_SERVER_ERROR.status,
                "Error occured"
              )
            );
        }
      });
    }
  });
};
