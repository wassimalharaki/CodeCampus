const router = require("express").Router();
const Problem = require("../models/Problem");

router.post("/", async (req, res) => {
    const {user_id, name, visible, tags, statement, tcs} = req.body;
    const id = (await Problem.find().sort({$natural: -1}).limit(1))[0].id + 1;
    const newProblem = new Problem({
        id,
        user_id,
        name,
        visible,
        tags,
        statement,
        tcs
    });
    const prob = await newProblem.save();
    res.status(200).json(prob);
});

router.post("/find", async (req, res) => {
    const {id} = req.body;
    const problem = await Problem.find({id: id});
    if (problem.length)
        res.status(200).json("OK");
    else
        res.status(200).json("NO");
});

router.put("/:id", async(req, res) => {
    const {user_id, name, visible, tags, statement, tcs} = req.body;
    const problem = (await Problem.find({id: req.params.id}))[0];
    const updatedProblem = await Problem.findByIdAndUpdate(problem._id, {
        user_id,
        name,
        visible,
        tags,
        statement,
        tcs,
    });
    res.status(200).json(updatedProblem);
});

router.delete("/:id", async (req, res) => {
    await Problem.findByIdAndDelete(req.params.id);
    res.status(200).json("OK");
});

router.get("/:id", async (req, res) => {
    const problem = (await Problem.find({id: req.params.id}))[0];
    res.status(200).json(problem);
});

router.get("/by/:id", async (req, res) => {
    const problems = await Problem.find({user_id: req.params.id});
    res.status(200).json(problems);
});

router.get("/", async (req, res) => {
    res.status(200).json(await Problem.find());
});

module.exports = router;