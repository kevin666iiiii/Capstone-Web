//let viewId = null;
let date = null;
let sessionId = null;
let tutor = null;

$(document).ready(function () {
    init();
    renderData();
});


function getUrlParams() {
    let url = window.location.href;
    let obj = {};
    let index = url.indexOf("?");
    let params = url.substr(index + 1);
    //console.log(params);
    if (index != -1) {
        // 有参数时
        let parr = params.split("&");
        for (let i of parr) {
            // 遍历数组
            let arr = i.split("=");
            obj[arr[0]] = arr[1];
        }
    }
    return obj;
}

function backPage() {
    window.history.back();
}

function renderData() {
    $.getJSON(`../json/detail_${sessionId}.json`, function (data) {
        let communicationLevelInfo = data.communicationLevelInfo;
        let instructionDeliveryInfo = data.instructionDeliveryInfo;
        let techToolUsageInfo = data.techToolUsageInfo;
        let socioEmotionalTeachingInfo = data.socioEmotionalTeachingInfo;
        let feedbackInfo = data.feedbackInfo;

        renderCardInfo('Communication Level', communicationLevelInfo);
        renderCardInfo('Instruction Delivery', instructionDeliveryInfo);
        renderCardInfo('Tech & Tool Usage', techToolUsageInfo);
        renderCardInfo('Socio-Emotional Teach', socioEmotionalTeachingInfo);
        renderCardInfo('Feedback', feedbackInfo);

        renderTimeLine(data.timeline.communicationLevel);
        renderTimeLine(data.timeline.instructionDelivery);
        renderTimeLine(data.timeline.techToolUsage);
        renderTimeLine(data.timeline.socioEmotionalTeaching);
        renderTimeLine(data.timeline.feedback);
        renderTimeText(data.timeline.timeText);
    })
}

function renderCardInfo(cardTitle, data) {

    let remarksHtmlContent = '';
    for (let i = 0; i < data.remarks.length; i++) {
        remarksHtmlContent += `<div>${data.remarks[i]}</div>`
    }

    let contentCardBgColor = 'content-card-grey';
    let progressColor = 'progress-color-light-grey';
    let progressBarColor = 'progress-bar-color-white';

    // if (data.dos != null && data.dont != null) {
    //     contentCardBgColor = 'content-card-white';
    //     progressColor = 'progress-color-lighter-grey';
    //     progressBarColor = 'progress-bar-color-grey';
    // }

    $("#cardContainer").append(`
            <div class="content-card ${contentCardBgColor}">
                <p class="content-card-title">${cardTitle}</p>
                <p class="content-card-sub">${data.level}</p>

                <div class="progress-container">
                    <div class="progress progress-container ${progressColor}">
                    
                        <div class="progress-bar ${progressBarColor}" role="progressbar" style="width: ${data.percent}%"
                             aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress-percent">
                        ${data.percent}%
                    </div>
                </div>
                
                <div class="remarks-container">
                    ${remarksHtmlContent}
                </div>
            </div>
    `);

}

function renderTimeLine(data) {

    let blockHtmlContent = "";
    for (let i = 0; i <data.length; i++) {
        // blockHtmlContent += `<div class="row-block"><div class="time-line-block block-color-${data[i]}"></div></div>`;
         blockHtmlContent += `<div class="time-line-block block-color-${data[i]}"></div>`;

    }

    $("#timeLineContainer").append(`
        <div class="row-block">
            ${blockHtmlContent}
        </div>
    `);
}

function renderTimeText(timeTextArray) {
    //let timeTextArr = ["00'","03'","06'","09'","12'","15'","18'","21'","24'","27'","30'","33'","36'","39'","42'","45'","48'","51'","54'","57'"];
    let timeTextArr = timeTextArray;
    let timeTextHtmlContent = "";
    for (let j = 0; j <timeTextArr.length; j++) {
        timeTextHtmlContent += `<label class="time-text" style="margin-right: 4.2px">${timeTextArr[j]}</label>`;
    }
    $("#timeLineContainer").append(`
        <div>
            ${timeTextHtmlContent}
        </div>
    `);
}

function init() {
    //viewId = getUrlParams().viewId;
    date = getUrlParams().date;
    sessionId = getUrlParams().sessionId;
    tutor = getUrlParams().tutor.replace("%20", " ");

    $("#dateBadge").text(date)
    $("#sessionIdBadge").text(sessionId)
    $("#tutorBadge").text(tutor)
}