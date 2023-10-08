const months = {
    'Jan': 01,
    'Feb': 02,
    'Mar': 03,
    'Apr': 04,
    'May': 05,
    'Jun': 06,
    'Jul': 07,
    'Aug': 08,
    'Sep': 09,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};

const getMonthNum = (dateStr) => {
    const dateArr = dateStr.trim().split(" ");
    const day = dateArr[0];
    const monthStr = dateArr[1];
    const monthNum = months[monthStr];
    if (!monthNum || !day || !monthStr) {
        throw new Error('Month num value can not be parsed!')
    } else {
        return { month: monthNum, day };
    }
}


const pnlCalculator = () => {

}

module.exports = {
    getMonthNum
}