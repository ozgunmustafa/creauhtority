import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const BlankProfilePicture = ({ classNames, text, size }) => {
  const [contraction, setContraction] = useState('');

  const colorSet = [
    ['#dee6c8', '#1896aa'],
    ['#E8284E', '#e9e9e1'],
    ['#686889', '#f6e0ce'],
    ['#232945', '#f5e5ce'],
    ['#1b274d', '#4fec5f'],
    ['#d7dcbc', '#271d59'],
    ['#271d59', '#ecebd9'],
    ['#fb9754', '#28244c'],
    ['#fcd0bf', '#2f2949'],
    ['#bee9dd', '#3b73bd'],
    ['#f4dbd1', '#4c88c1'],
    ['#cf7ba2', '#323554'],
  ];
  const randomNumber = Math.floor(Math.random() * 10);

  const splitText = () => {
    const spltTextArry = text.split(' ');
    let tempText = '';
    spltTextArry.map((item) => {
      tempText = tempText + item[0];
    });
    setContraction(tempText);
  };

  useEffect(() => {
    splitText();
  }, []);

  return (
    <div
      className={`${classNames} rounded-full  flex items-center justify-center overflow-x-hidden uppercase`}
      style={{
        fontWeight: '600',
        width: size,
        height: size,
        backgroundColor: colorSet[randomNumber][0],
        color: colorSet[randomNumber][1],
      }}
    >
      {contraction}
    </div>
  );
};

export default BlankProfilePicture;
