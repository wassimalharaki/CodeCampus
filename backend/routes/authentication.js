const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(password, user.password);
        if (!validated)
            return res.status(400).json("Wrong credentials!");

        let ret = user._doc;
        delete ret.password;
        return res.status(200).json(ret);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
