const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    res.status(200).json(await User.find());
});

router.post("/find", async(req, res) => {
    const {email} = req.body;
    const user = await User.find({email: email});
    if (user.length)
        res.status(200).json("OK");
    else
        res.status(200).json("NO");
});

router.get("/:id", async (req, res) => {
    res.status(200).json(await User.findById(req.params.id));
});

router.post("/", async (req, res) => {
    const {email, password, role} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({
        email: email,
        password: hashed,
        role: role
    });
    const user = await newUser.save();
    res.status(200).json("OK");
});

router.put("/:id", async (req, res) => {
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.params.id, {
        password: hashed
    });
    res.status(200).json("OK");
});

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("OK");
});

module.exports = router;
