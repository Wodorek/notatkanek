import React, { useState } from 'react';
import classes from './TextProcessor.module.css';

const testText = `Mikrofon

Pokaż

Nagraj

Czat

Ludzie

Wyjdź

18:04
Michalina
this person changed his standpoint

he has reservations about my work
reservations - zarzuty
18:05
Michalina
managment board - zarząd
18:06
Michalina
notice - wypowiedzenie
18:08
Michalina
chatGPT
18:09
Michalina
artificial intelligence/AI
18:11
Michalina
car traffic
18:13
Michalina
stuffies
18:14
Michalina
tenement
18:15
Michalina
foggy - mglisty
18:18
⁨Michalina⁩ rozpoczął
udostępnianie ekranu
18:29
⁨Michalina⁩ zakończył
udostępnianie ekranu
18:30
⁨Michalina⁩ rozpoczął
udostępnianie ekranu
18:32
Michalina
vibrant - pełen życia
18:33
Michalina
lively - LAWLI - pełen życia
18:37
Michalina
stroll - spacerować
walk=stroll
as - kiedy/podczas gdy
18:38
Michalina
bustling - tetniące życiem
18:39
Michalina
a sign advertising - znak reklamujący
18:40
Michalina
turn to - odwrócić się
18:41
Michalina
Shall we give it a try? - Czy powinniśmy spróbować? A może spróbujemy?
18:43
Michalina
shy away from  - stronić od czegoś
18:44
Michalina
sign up for - zapisać się na
18:45
Michalina
immerse - zanurzyć sie w coś. oddać sie czemuś
18:47
Michalina
athleticism - tężyzna fizyczna
18:48
Michalina
turning them into - zmieniając ich w
18:51
Michalina
boudless - nieskończoną, bezgraniczną
19:01
⁨Michalina⁩ zakończył`;

const TextProcessor = () => {
  const [rawText, setRawText] = useState('');
  const [processedText, setProcessedText] = useState('');

  function processTextHandler(text: string) {
    const split = text.split('\n');

    const complete = split.filter((val) => {
      return val.includes('-');
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
