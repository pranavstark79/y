const parseText = (strArr) => {
  const len = strArr.length;
  const map = {
    0: 'checkboxCall',
    1: 'oiCall',
    2: 'callPrice',
    3: 'strikePrice',
    4: 'putPrice',
    5: 'oiPut',
    6: 'checkboxPut',
  };

  const data = [];

  for (let i = 0; i < len; i = i + 7) {
    let tempObj = {};
    let counter = 0;
    for (let j = i; j < i + 7; j++) {
      const key = map[counter];
      if (!key.includes('checkbox')) {
        let value = strArr[j];
        if (value.includes('\n')) {
          value = value.split('\n')[0];
        }
        tempObj[key] = value;
      }
      counter++;
    }
    data.push(tempObj);
  }

  //pass data to socketio server
  return data;
};

module.exports = {
  parseText,
};
