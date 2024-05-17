const router = require("express").Router();
const Exam = require("../models/Exam");
const Problem = require("../models/Problem");
const Submission = require("../models/Submission");

router.post("/", async (req, res) => {
    const {user_id, name, start_time, end_time, problems, users} = req.body;
    const newExam = new Exam({
        user_id,
        name,
        start_time,
        end_time,
        problems,
        users
    });
    res.status(200).json(await newExam.save());
});

router.put("/:id", async(req, res) => {
    const {name, start_time, end_time, problems, users} = req.body;
    const exam = await Exam.findByIdAndUpdate(req.params.id, {
        name,
        start_time,
        end_time,
        problems,
        users
    });
    res.status(200).json(exam);
});

router.delete("/:id", async (req, res) => {
    await Exam.findByIdAndDelete(req.params.id);
    res.status(200).json("OK");
});

router.get("/:id", async (req, res) => {
    res.status(200).json(await Exam.findById(req.params.id));
});

router.post("/by", async (req, res) => {
    const {user_id} = req.body;
    res.status(200).json(await Exam.find({user_id: user_id}));
});

router.post("/for", async (req, res) => {
    const {email} = req.body;
    const now = new Date();

    res.status(200).json(await Exam.find({
        users: email,
        start_time: {$lte: now},
        end_time: {$gte: now}
    }));
});

router.post("/probs", async (req, res) => {
    const {id} = req.body;
    const exam = await Exam.findById(id);

    var problems = [];
    for await (const id of exam.problems)
        problems.push((await Problem.find({id: id}))[0]);

    res.status(200).json(problems);
});

router.get("/", async (req, res) => {
    res.status(200).json(await Exam.find());
});

router.post("/results", async (req, res) => {
    const {id} = req.body;

    const exam = await Exam.findById(id);

    var scores = [];
    for await (const u of exam.users) {
        var user = {};
        user['email'] = u;
        var grand_total = 0, passed = 0;
        for await (const p of exam.problems) {
            const subs = await Submission.find({
                user_email: u,
                problem_id: p,
                createdAt: {
                    $gte: exam.start_time,
                    $lte: exam.end_time
                },
            });

            const prob = (await Problem.find({id: p}))[0];

            var max = 0;
            for await (const s of subs)
                max = Math.max(max, s.passed);

            grand_total += prob.tcs.length;
            passed += max;
            user[p] = {
                "score": max,
                "total": prob.tcs.length
            };
        }
        user['grand_score'] = passed;
        user['grand_total'] = grand_total;
        scores.push(user);
    }

    res.status(200).json(scores);
});

module.exports = router;