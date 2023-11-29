import React, { useEffect, useState } from 'react';
import classes from './TextProcessor.module.css';
import { BsFillBugFill, BsFillGearFill } from 'react-icons/bs';
import Modal from './Modal';
import defaultSettings from '../app/settings.json';

const regex = new RegExp(/[a-z]+/i);

async function getTranslations(wordsString: string) {
  const translations = await fetch(`/api/getTranslation/${wordsString}`);

  return translations;
}

const TextProcessor = () => {
  const [rawText, setRawText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [usedChars, setUsedChars] = useState(0);
  const [settings, setSettings] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getUsedChars() {
      await fetch('/api/getUsedChars')
        .then((resp) => {
          return resp.json();
        })
        .then((chars) => {
          setUsedChars(chars.chars.character_count);
        });
    }

    const localSettings = localStorage.getItem('settings');

    if (!localSettings) {
      setSettings(defaultSettings);
    } else {
      setSettings(JSON.parse(localSettings));
    }

    getUsedChars();
  }, []);

  async function pasteHandler() {
    const text = await navigator.clipboard.readText();
    setRawText(text);
  }

  function removeUselessLines(text: string) {
    const lines = text.split('\n').map((line) => {
      return line.replace('\r', '').replace(/\?/g, '');
    });

    const excluded = settings.exclusions
      .split(',')
      .map((e: string) => e.trim());

    console.log('excluded', excluded);

    const complete = lines.filter((line) => {
      const hasWords = [...excluded, '\n'].some((word) => line.includes(word));
      const isLetter = regex.test(line[0]);

      return !hasWords && isLetter && line.length > 0;
    });
    console.log('complete', complete);
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

    //replacements should be in one regex?
    param = param.replaceAll('/', ' ').replaceAll('\\', '');

    console.log('param', param);

    return param;
  }

  async function textProcessingHandler(text: string) {
    console.log('removing');
    const usefulLines = removeUselessLines(text);
    console.log('finding');
    const missingTranslation = findUntranslated(usefulLines);
    console.log('creating');
    const translationParam = createTranslateParam(
      usefulLines,
      missingTranslation
    );

    const translationsData = await getTranslations(translationParam).then(
      (resp) => {
        return resp.json();
      }
    );

    console.log(translationsData);

    const translatedSentences = translationsData.translated.translations;

    //this is such a hack...
    let currIdx = -1;
    const finishedText = usefulLines.map((line, idx) => {
      if (missingTranslation.includes(idx)) {
        currIdx++;
        return `${line}${
          translatedSentences[currIdx].detected_source_language !== 'PL'
            ? ` - ${translatedSentences[currIdx].text}`
            : ''
        }`;
      }

      return line;
    });

    setProcessedText(finishedText.join('\n'));
  }

  function copyHandler(text: string) {
    navigator.clipboard.writeText(text);
  }

  async function bugReportHandler() {
    const text = encodeURI(rawText);
    console.log(encodeURI(text));
    await fetch(`/api/sendBugReport`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),

      method: 'POST',
      body: JSON.stringify(rawText),
    });
  }

  function openSettingsHandler() {
    setIsModalOpen(true);
  }

  function updateSettings(settings: { [key: string]: string }) {
    const newSettings = { ...settings };

    setSettings(newSettings);

    localStorage.setItem('settings', JSON.stringify(newSettings));
  }

  //TODO: take inner html into separate components

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          updateSettings={(settings: { [key: string]: string }) =>
            updateSettings(settings)
          }
          settings={settings}
        />
      )}
      <div className={classes.container}>
        <div className={classes.settingsBtns}>
          <div onClick={bugReportHandler} className={classes.bugBtn}>
            <BsFillBugFill size={35} />
          </div>
          <div onClick={openSettingsHandler} className={classes.bugBtn}>
            <BsFillGearFill size={35} />
          </div>
        </div>

        <div className={classes.inner}>
          <label className={classes.label}>Raw text</label>
          <textarea
            rows={20}
            className={classes.textArea}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          <button className={classes.btn} onClick={pasteHandler}>
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
    </>
  );
};

export default TextProcessor;
