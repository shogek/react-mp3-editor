import React from 'react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

type Props = {
  maxValue: number;
  curValue: number;
  heading: string;
};

function ProgressBar(props: Props) {
  const { maxValue, curValue, heading } = props;
  const percentage = Math.round(curValue / maxValue * 100);

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h4>{heading}</h4>
        <Progress percent={percentage} status="success" />
      </div>
    </div>
  );
}

export default ProgressBar;
