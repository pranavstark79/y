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

const parseHTML = (htmlStr) => {
    // console.log(htmlStr);
    let cancelledStr = addCancelled(htmlStr);
    let successStr = addSuccessful(cancelledStr);
    return successStr;
}


function addCancelled(htmlStr) {
    return htmlStr.replaceAll('<span class="ord131StatusColor" style="background: rgb(235, 91, 60);"></span>', `<span class="ord131StatusColor" style="background: rgb(235, 91, 60);"> ##Cancelled</span>`);
}

function addSuccessful(htmlStr) {
    return htmlStr.replaceAll('<span class="ord131StatusColor" style="background: rgb(0, 179, 134);"></span>', `<span class="ord131StatusColor" style="background: rgb(0, 179, 134);"> ##Executed</span>`);
}


const pnlCalculator = () => {

}

module.exports = {
    getMonthNum,
    parseHTML
}