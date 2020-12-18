import pkg from 'passport-google-oauth20'
const { Strategy: GoogleStrategy } = pkg
import mongoose from 'mongoose'
import pkgF from 'passport-facebook'
const { Strategy: FacebookStrategy } = pkgF

import User from '../models/userModel.js'

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          'https://sabongshop.herokuapp.com/api/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })
          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image:
            profile.photos || profile.photos > 0
              ? profile.photos[0].value
              : 'none',
        }

        try {
          let user = await User.findOne({ facebookId: profile.id })
          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
