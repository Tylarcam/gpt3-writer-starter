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
  }  
  // Create a function to export to CSV
function exportToCsv(text) {
  // Split the text into an array, separated by line breaks
  const outputArray = text.split('\n');
  
  // Create a string for the CSV file
  let outputString = '';

  // Iterate through the array, adding the values to the outputString
  outputArray.forEach(row => {
    outputString += '"' + row.replace(/\"/g, '""') + '"' + '\n';
  });

  // Create a blob object with the outputString as its contents
  const blob = new Blob([outputString], { type: 'text/csv' });

  // Create a link to the file and simulate a click on it
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = prompt('Enter a filename for the exported CSV:') || 'exported_data.csv';
  link.click();
}
    ;
    
    
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <img src="favicon.ico" width="150px" height="150px"></img> 
            <h1>TourGo</h1>
          </div>
          <div className="header-subtitle">
            <h2>"Focus Less on Planning Tour Locations.<br></br>
            Spend More Time Doing What You Love, Creating Music."</h2>
          </div>
        </div>
      </div>
<div>
  <textarea
    className="prompt-box"
    placeholder="Enter the State or City of your tour dates, let us connect you to the right venues!"
    value={userInput}
    onChange={onUserChangedText}
/>
</div>
      
                                   
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
  > Copy </button>
  <button className="export-button"
    onClick={() => {exportToCsv(apiOutput); }}
  > Export to CSV </button>


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


