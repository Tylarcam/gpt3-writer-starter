import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/twitterIcon.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
    };
    
    
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <img src="favicon.ico" width="100px" height="100px"></img> 
            <h1>ShrtHnd</h1>
          </div>
          <div className="header-subtitle">
            <h2>"Speed Read. Get Your Time Back with ShrtHnd"</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container"> 
        <textarea
                              placeholder="Enter a Book, Journal, or Publication Title, and we will do the rest! "
        value={userInput}
        onChange={onUserChangedText}
                                    />
<div className="prompt-buttons">
      <a
        className={isGenerating ? 'generate-button loading' : 'generate-button'}
        onClick={callGenerateEndpoint}
>
        <div className="output-content">
        {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
        </div>
      </a>
    </div>
  </div>

    <div className="output">
    <div className="output-header-container">
    <div className="output-header">
      <h3>Output</h3>
    </div>
    </div>
    </div>
  
    <textarea
    className="prompt-box"
    placeholder=""
    value={apiOutput}
  />
  
  <button
    className="copy-button"
    onClick={() => {
      navigator.clipboard.writeText(apiOutput);
      onclick={onUserChangedText}    
    }}
  >
    Copy
  </button>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/tylarcampbell"
          target="_blank"
          rel="noreferrer"
        >
          <footer className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p> © 2022 ShrtHnd AI. All rights reserved. Built by @tylarcampbell</p>
          </footer>
        </a>
        
      </div>
    </div>
    
  );
};

export default Home;
