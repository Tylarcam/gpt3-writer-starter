import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
If the publication has sub-headers or chapters, outline an detailed and accurate table of contents:
`
;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.85,
    max_tokens: 1250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build prompt #2.
  const secondPrompt =

  `
  TOC: ${basePromptOutput.text}
  
  
  Example for or i,1,2,3,a:
  i. write the citation in the APA style.
  Write the authors three main ideas as single sentences 
  1.
  2.
  3.
  a. Write an analysis that shows that the reader did their research. 
  If the publication is an academic article, If the publication is academic, 
  what methods if any were being explored if any.
  Write a Table of Contents than an i,1,2,3,a:
`
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;