'use strict';

const express = require('express');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const { User } = require('../../../../../models');
const Response = require('../../../../../responses');
const middlewares = require('../../../../../middlewares');

const router = express.Router({ mergeParams: true });

/* POST /users/find/password */
router.post(
  '/',
  [
    body('username')
      .trim()
      .custom(v => User.validateUsername(v)),
  ],
  [
    sanitizeBody('username').trim(),
  ],
  middlewares.validate(),
  async (req, res, next) => {
    try {
      const email = await User.passwordSendmail({ 
        username: req.body.username,
      })
      return new Response.Success({ email }).send(res);
    } catch (err) {
      return next(err);
    }
  },
);

/* POST /users/find/password/reset */
router.post(
  '/reset',
  [
    body('username')
      .trim()
      .custom(v => User.validateUsername(v)),
    body('password').trim().isLength({ min: 6 }),
  ],
  [
    sanitizeBody('username').trim(),
    sanitizeBody('password').trim(),
  ],
  middlewares.validate(),
  async (req, res, next) => {
    try {
      const userFound = await User.findByUsername(req.body.username);
      if (!userFound) {
        return new Response.BadRequest().send(res);
      }
      if (userFound.isAnnonymous) {
        return new Response.Unauthorized().send(res);
      }
      if (await userFound.verifyPassword(req.body.password)) {
        return new Response.Conflict().send(res);
      }
      await userFound.update({
        password: req.body.password,
        confirmCode: null,
        confirmCodeExpiry: null,
      });
      return new Response.Success().send(res);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
