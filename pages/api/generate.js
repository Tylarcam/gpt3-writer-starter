import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Create a list of Hip-Hop venues location in the following cities: 
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
  LOV: ${basePromptOutput.text}
  
  
  generate a list of contact information for each venue and create a database called {VenueEnroute} with the following list of venues and parameters.
    database parameters:
    venue_name:
    contact_name:
    telephone:
    email:
    address:
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

    
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;