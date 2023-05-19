import React, { useState } from 'react';

const TextProcessor = () => {
  const [rawText, setRawText] = useState('');
  const [processedText, setProcessedText] = useState('');

  return (
    <div>
      <textarea value={rawText} onChange={(e) => setRawText(e.target.value)} />
      <textarea
        value={processedText}
        onChange={(e) => setProcessedText(e.target.value)}
      />
    </div>
  );
};

export default TextProcessor;
