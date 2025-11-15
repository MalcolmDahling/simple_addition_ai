import { BottomContainerStyle, ButtonStyle, ContainerStyle, H1Style, InnerContrainerStyle, ParagraphStyle, SvgContainerStyle, TextInputStyle } from './form.css';
import { train, predict, dataset, net } from '@/functions/ai';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';

export default function Form() {
  const [network, setNetwork] = useState<any>();
  const [training, setTraining] = useState(false);
  const [answer, setAnswer] = useState<null | number>(null);
  const [number0, setNumber0] = useState<string>('0');
  const [number1, setNumber1] = useState<string>('0');
  const [trainingText, setTrainingText] = useState('Training');

  const regex = /^(1[0-5]|[0-9])$/;

  function handleClickTraining() {
    if (training || network) return;

    setTrainingText('Training');
    setTraining(true);

    setTimeout(() => {
      setNetwork(train(net, dataset, 2000));
      setTraining(false);
      setTrainingText('Training Complete!');
    }, 100);
  }

  function handleClickCalculate() {
    if (!network) return;

    setAnswer(predict(network, parseInt(number0), parseInt(number1)));
  }

  function handleChange(e: any, num: number) {
    if (regex.test(e.target.value) || e.target.value === '') {
      if (num === 0) {
        setNumber0(e.target.value);
      } else {
        setNumber1(e.target.value);
      }
    }
  }

  return (
    <div>
      <h1 className={H1Style()}>Simple Addition AI</h1>
      <div className={ContainerStyle()}>
        <p className={ParagraphStyle()}>
          First train the AI, this will take a few seconds depending on your CPU speed.
          <br />
          <br />
          Then enter two numbers between 0-15 and let the AI calculate it for you.
        </p>

        <button
          className={ButtonStyle({ trainButton: true, disabled: network ? true : false })}
          onClick={handleClickTraining}
        >
          {trainingText}

          <div className={SvgContainerStyle()}>{trainingText === 'Training' && <ReactSVG src="/svg/spinner.svg" />}</div>
        </button>

        <div className={InnerContrainerStyle()}>
          <input
            className={TextInputStyle()}
            type="text"
            onChange={(e) => handleChange(e, 0)}
            value={number0}
            disabled={!network}
          ></input>

          <span> + </span>

          <input
            className={TextInputStyle()}
            type="text"
            onChange={(e) => handleChange(e, 1)}
            value={number1}
            disabled={!network}
          ></input>

          <button
            className={ButtonStyle({ disabled: !network || !number0 || !number1 })}
            onClick={handleClickCalculate}
            disabled={!network || !number0 || !number1}
          >
            Calculate
          </button>
        </div>

        <div className={BottomContainerStyle()}>
          <span>Answer: {answer}</span>
        </div>
      </div>
    </div>
  );
}
