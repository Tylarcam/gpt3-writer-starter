import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Example for Mckendrick's Method or i,1,2,3,a:
i. citation in the APA style.
write any three main ideas as a single sentence 
in the 1,2, 3 lines:
1.
2.
3.
for a write "a:". 

If the publication is academic, what methods if any were being explored in this publication:
Write an i,1,2,3,a for the Book, Publication, or Journal article:
`
;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build prompt #2.
  const secondPrompt =

  `Write an i,1,2,3,a for the following url, 
  title, or library catalog link:
  
  
  i123a setUP: ${basePromptOutput.text}
  
  write a i123:
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