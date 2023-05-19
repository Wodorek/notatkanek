import React, { useState } from 'react';
import classes from './TextProcessor.module.css';

const TextProcessor = () => {
  const [rawText, setRawText] = useState('');
  const [processedText, setProcessedText] = useState('');

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <label>Raw text</label>
        <textarea
          rows={20}
          className={classes.textArea}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />
        <button>Copy</button>
      </div>
      <div className={classes.inner}>
        <label>Cleaned Up</label>
        <textarea
          rows={20}
          className={classes.textArea}
          value={processedText}
          onChange={(e) => setProcessedText(e.target.value)}
        />
        <button>Copy</button>
      </div>
    </div>
  );
};

export default TextProcessor;
