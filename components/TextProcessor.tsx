import React, { useState } from 'react';
import classes from './TextProcessor.module.css';



const testArr: string[] = [
  'Michalina',
  '\n',
  'udostępnianie',
  'Wysłano',
  'Kamera',
  'Mikrofon',
  'Pokaż',
  'Nagraj',
  'Czat',
  'Ludzie',
  'Wyjdź',
];
const regex = new RegExp(/[a-z]+/i);

const TextProcessor = () => {
  const [rawText, setRawText] = useState('');
  const [processedText, setProcessedText] = useState('');

  function processTextHandler(text: string) {
    const lines = text.split('\n');

    const complete = lines.filter((line) => {
      const hasWords = testArr.some((word) => line.includes(word));
      const isLetter = regex.test(line[0]);

      console.log(isLetter, line, line[0]);

      return !hasWords && isLetter;
    });

    setProcessedText(complete.join('\n'));
  }

  function copyHandler(text: string) {
    navigator.clipboard.writeText(text);
  }

  async function pasteHandler() {
    const text = await navigator.clipboard.readText();
    setRawText(text);
  }

  //TODO: take inner html into separate components

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <label className={classes.label}>Raw text</label>
        <textarea
          rows={20}
          className={classes.textArea}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />
        <button className={classes.btn} onClick={() => pasteHandler()}>
          Paste
        </button>
      </div>
      <div className={classes.inner}>
        <label className={classes.label}>Cleaned Up</label>
        <textarea
          rows={20}
          className={classes.textArea}
          value={processedText}
          onChange={(e) => setProcessedText(e.target.value)}
        />
        <button
          className={classes.btn}
          onClick={() => copyHandler(processedText)}
        >
          Copy
        </button>
      </div>
      <div className={classes.btnContainer}>
        <button
          className={classes.btn}
          onClick={() => processTextHandler(rawText)}
        >
          Process
        </button>
      </div>
    </div>
  );
};

export default TextProcessor;
