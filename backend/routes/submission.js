const router = require("express").Router();
const Submission = require("../models/Submission");

router.get("/", async (req, res) => {
    res.status(200).json(await Submission.find());
});

router.post("/byemail", async (req, res) => {
    const {user_email} = req.body;
    res.status(200).json(await Submission.find({user_email: user_email}));
});

router.post("/forexam", async (req, res) => {
    const {user_email, start_time, end_time} = req.body;
    res.status(200).json(await Submission.find({
        user_email: user_email,
        createdAt: {
            $gte: start_time,
            $lte: end_time
        }
    }));
});

router.post("/", async (req, res) => {
    const {user_email, problem_name, problem_id, passed, total, source} = req.body;
    const newSubmission = new Submission({
        user_email,
        problem_name,
        problem_id,
        passed,
        total,
        source
    });
    res.status(200).json(await newSubmission.save());
});

module.exports = router;