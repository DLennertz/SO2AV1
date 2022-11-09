import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/brand.query.js";
import HttpStatus from "../util/HttpStatus.js";

export const getBrands = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching brands`);
  database.query(QUERY.SELECT_BRANDS, (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No brands found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Brands retrieved",
            { brands: results }
          )
        );
    }
  });
};

export const createBrand = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating brand`);
  database.query(
    QUERY.CREATE_BRAND,
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
        const brand = {
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
              "Brand created",
              { brand }
            )
          );
      }
    }
  );
};

export const getBrand = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching brand`);
  database.query(QUERY.SELECT_BRAND, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Brand id = ${req.params.id} not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Brand retrieved",
            results[0]
          )
        );
    }
  });
};

export const updateBrand = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching brand`);
  database.query(QUERY.SELECT_BRAND, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Brand id = ${req.params.id} not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating brand`);
      database.query(
        QUERY.UPDATE_BRAND,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  "Brand updated",
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

export const deleteBrand = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting brand`);
  database.query(QUERY.DELETE_BRAND, [req.params.id], (error, results) => {
    if (results != null) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(HttpStatus.OK.code, HttpStatus.OK.status, [
            `Brand Deleted`,
            results
          ])
        );
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Brand id = ${req.params.id} not found`
          )
        );
    }
  });
};
