const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

class AuthController {
  async createUser(req = request, res = response) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          ok: false,
          message: 'Email has already been registered'
        })
      }

      user = new User(req.body);

      // Encrypt the password
      const salt = bcrypt.genSaltSync(); // Valor aleatorio único que se genera antes de aplicar el algoritmo bcrypt, default value rounds = 10 
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      const token = await generateJWT(user.id, user.name);

      res.status(201).json({
        ok: true,
        message: "User created successfully",
        uid: user.id,
        name: user.name,
        token
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Talk to the administrator"
      })
    }

  }

  async login(req = request, res = response) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          ok: false, 
          message: 'Email is not a registered'
        });
      }

      // decrypt password
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false, 
          message: 'Invalid password'
        });
      }

      const token = await generateJWT(user.id, user.name);

      res.json({
        ok: true,
        message: 'User authenticated successfully',
        user: {
          name: user.name,
          uid: user.id
        },
        token
      })

    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Talk to the administrator"
      })
    }
  }

  async revalidateToken(req = request, res = response) {
    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT(uid, name)

    res.status(200).json({
      ok: true,
      name,
      uid,
      token,
    });
  }
}

module.exports = { AuthController };
