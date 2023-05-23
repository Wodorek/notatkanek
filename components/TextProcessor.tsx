import React, { useEffect, useState } from 'react';
import classes from './TextProcessor.module.css';

const testArr: string[] = [
  'Wiadomość usunięta',
  'Bukaj',
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

async function getTranslations(wordsString: string) {
  const translations = await fetch(`/api/getTranslation/${wordsString}`);

  return translations;
}

const TextProcessor = () => {
  const [rawText, setRawText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [usedChars, setUsedChars] = useState(0);

  useEffect(() => {
    async function getUsedChars() {
      fetch('/api/getUsedChars')
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          setUsedChars(resp.translated.character_count);
        });
    }

    getUsedChars();
  });

  async function pasteHandler() {
    const text = await navigator.clipboard.readText();
    setRawText(text);
  }

  function removeUselessLines(text: string) {
    const lines = text.split('\n').map((line) => {
      return line.replace('\r', '');
    });

    const complete = lines.filter((line) => {
      const hasWords = testArr.some((word) => line.includes(word));
      const isLetter = regex.test(line[0]);

      return !hasWords && isLetter;
    });
    return complete;
  }

  function findUntranslated(lines: string[]) {
    const idxs: number[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes('-')) {
        idxs.push(i);
      }
    }

    return idxs;
  }

  function createTranslateParam(lines: string[], idxs: number[]) {
    let param = `${lines[idxs[0]]}`;

    for (let i = 1; i < idxs.length; i++) {
      const newFragment = `&text=${lines[idxs[i]]}`;
      param = param + newFragment;
    }

    return param;
  }

  async function textProcessingHandler(text: string) {
    const usefulLines = removeUselessLines(text);
    const missingTranslation = findUntranslated(usefulLines);
    const translationParam = createTranslateParam(
      usefulLines,
      missingTranslation
    );

    const translationsData = await getTranslations(translationParam).then(
      (resp) => {
        return resp.json();
      }
    );

    const translatedSentences = translationsData.translated.translations;

    //this is such a hack...
    let currIdx = -1;
    const finishedText = usefulLines.map((line, idx) => {
      if (missingTranslation.includes(idx)) {
        currIdx++;
        return `${line} - ${translatedSentences[currIdx].text}`;
      }

      return line;
    });

    setProcessedText(finishedText.join('\n'));
  }

  function copyHandler(text: string) {
    navigator.clipboard.writeText(text);
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
          onClick={() => textProcessingHandler(rawText)}
        >
          Process
        </button>
        <div>{usedChars} / 500,000</div>
      </div>
    </div>
  );
};

export default TextProcessor;
