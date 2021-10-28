'use strict';

const express = require('express');

const router = express.Router({ mergeParams: true });
const Response = require('../../responses');
const models = require('../../models');

router.get(
  '/',
  async (req, res, next) => {
    try {
      const userFound = await models.User.findByUsername(req.query.username);
      if (userFound) {
        if (new Date() < userFound.confirmCodeExpiry && userFound.confirmCode === req.query.code) {
          if (req.query.pwdreset) {
            userFound.update({
              confirmCode: null,
              confirmCodeExpiry: null,
            });
          } else {
            userFound.update({
              emailConfirmed: true,
              confirmCode: null,
              confirmCodeExpiry: null,
            });
          }
          return new Response.Success().send(res);
        }
      }

      return new Response.BadRequest().send(res);

    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
