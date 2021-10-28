'use strict';

const express = require('express');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const { User } = require('../../../../models');
const Response = require('../../../../responses');
const middlewares = require('../../../../middlewares');

const router = express.Router({ mergeParams: true });

/* POST /users/find/id */
router.post(
  '/id',
  [
    body('email')
      .trim()
      .isEmail()
      .isLength({ max: 128 }),
  ],
  [
    sanitizeBody('email').trim(),
  ],
  middlewares.validate(),
  async (req, res, next) => {
    try {
      const email = req.body.email;
      if (!email) {
        return new Response.BadRequest().send(res);
      } else {
        const username = await User.findOne({
          attributes: ['username'],
          where: { email }
        })
        if (!username) {
          return new Response.ResourceNotFound().send(res);
        } else {
          return new Response.Success(username).send(res);
        }
      }
    } catch (err) {
      return next(err);
    }
  },
);


const password = require('./password');

router.use('/password', password);

module.exports = router;
