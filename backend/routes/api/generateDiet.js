const express = require('express');
const router = express.Router();
const { OpenAIStream, streamToResponse } = require('ai');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: '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'
});

router.post('/', async (req, res) => {
  console.log(req.body)
  const { weight, height, amountMeal, goal, gender, comments } = req.body;
  if (
    weight == undefined &&
    height == undefined &&
    amountMeal == undefined &&
    goal == undefined &&
    gender == undefined &&
    comments == undefined
  ) {
    res.send({ error: 'Data is required' });
    return;
  }

  const dietQuestion = `Generate a complete diet, containing ${amountMeal} meals. The diet will have to contain the amount of each food for each meal, my characteristics for the diet are as follows: half ${height} m, weight ${weight} lb, my goal is ${goal}, my sexual gender is $ {gender}}, and I have some observations about the diet: ${comments}. And for more expensive and difficult-to-find foods, present a second option right after. I never want to mention the ‘AI model’. I just want the main content. Always translate into Portuguese. Only generate the diet, do not write anything other than the diet, for the user to consult a nutritionist or modify the diet, etc., as this is not necessary for the project, that is, just write the diet with the foods and meals. only that`

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: dietQuestion }],
      model: 'gpt-3.5-turbo',
      stream: true
    });
    const stream = OpenAIStream(response);
    streamToResponse(stream, res);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;
