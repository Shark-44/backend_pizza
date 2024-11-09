const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const { decodeJWT } = require("../helper/jwtHelper")

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
}

const hashPassword = (req, res, next) => {
  console.info(req.body)
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword
      delete req.body.password
      next()
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send("Internal Server Error")
    })
}

const verifyPassword = (req, res, next) => {
  argon2
    .verify(req.user.password, req.body.password)

    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })

        delete req.user.password
        res.cookie("auth_token", token, { httpOnly: true, secure: false })
        res.send({ utilisateur: req.user })
      } else {
        res.sendStatus(401).send("Ivalid Credential")
      }
    })
    .catch((err) => {
      console.error(err)

      res.sendStatus(520)
    })
}
const checkToken = async (req, res, next) => {
  try {
    // eslint-disable-next-line dot-notation
    const token = req.cookies["auth_token"]
    // eslint-disable-next-line no-undef, new-cap
    if (!token) throw new error()

    const data = decodeJWT(token)
    if (!data) {
      return res.status(401).send("Invalid Credentials")
    }
    return next()
  } catch (err) {
    console.error(err)
    res.sendStatus(401)
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  checkToken,
}