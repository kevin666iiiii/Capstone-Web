let technicalIssuesHasChecked = true;
let sessionDurationHasChecked = true;
let rubriceRatingHasChecked = true;
let tableData = [];

$(document).ready(function () {
    init();
    getAndRenderListData();
});


function getAndRenderListData() {
    $("#tableBody").empty();

    // let url = "../json/list_first_page.json";
     let url = "https://kevin666iiiii.github.io/Capstone-Web.github.io/json/list_first_page.json";

    let conditionRankTextArr = [];
    if (technicalIssuesHasChecked) conditionRankTextArr.push("Technical Issues");
    if (sessionDurationHasChecked) conditionRankTextArr.push("Short Sessions");
    if (rubriceRatingHasChecked) conditionRankTextArr.push("Low Rubric Rating");


    $.getJSON(url, function (dataList) {

        tableData = dataList;

        for (let i = 0; i < dataList.length; i++) {

            let data = dataList[i];

            let riskAreasTextArr = data.riskAreas.map(item => item.text);

            //let riskAreasIsAllEqual = conditionRankTextArr.length === riskAreasTextArr.length && conditionRankTextArr.sort().toString() === riskAreasTextArr.sort().toString();
            // if (rankTextArr.length !== 0 && !riskAreasIsAllEqual){
            //     continue;
            // }

            let conditionRankIsInclude = conditionRankTextArr.every(item => riskAreasTextArr.includes(item));

            if (!conditionRankIsInclude){
                continue;
            }



            $("#tableBody").append(`
                <tr>
                    <td>${data.sessionId}</td>
                    <td>${data.tutor}</td>
                    <td>${data.subject}</td>
                    <td>${data.date}</td>
                    <td>${data.duration}</td>
                    <td id='riskAreasTag${i}'></td>
                    <td>
<!--                        <img class="btn-op" src="../img/btn_view.png" onclick='toDetailPage(${data.viewId})'/>-->
                        <img class="btn-op" src="./img/btn_view.png" onclick='toDetailPage(${i})'/>
                    </td>
                </tr>
            `);


            if (data.riskAreas.length > 0) {
                $(`#riskAreasTag${i}`).empty();
            }

            for (let j = 0; j < data.riskAreas.length; j++) {

                let riskArea = data.riskAreas[j];
                let riskAreaText = riskArea.text;
                let riskAreaColor = riskArea.color;

                $(`#riskAreasTag${i}`).append(`
                        <span class='tag tag-light-${riskAreaColor}'>${riskAreaText}</span>
                    `)

            }

            if ($(`#riskAreasTag${i}`).children().length === 0) {
                $(`#riskAreasTag${i}`).empty();
                $(`#riskAreasTag${i}`).append('-');
            }

        }

    });

}

function showConditionDialog() {
    $("#technicalIssuesCheckbox").prop("checked", technicalIssuesHasChecked);
    $("#sessionDurationCheckbox").prop("checked", sessionDurationHasChecked);
    $("#rubriceRatingCheckbox").prop("checked", rubriceRatingHasChecked);
    $('#myModal').modal();
}

function removeCondition(conditionName) {
    if (conditionName == 'technicalIssues') {
        technicalIssuesHasChecked = false;
        //$("#technicalIssuesTag").css("display", "inline-block");
        $("#technicalIssuesTag").css("display", "none");
    }
    if (conditionName == 'sessionDuration') {
        sessionDurationHasChecked = false;
        $("#sessionDurationTag").css("display", "none");

    }
    if (conditionName == 'rubriceRating') {
        rubriceRatingHasChecked = false;
        $("#rubriceRatingTag").css("display", "none");
    }

    getAndRenderListData();
}

function setCondition() {

    let technicalIssuesChecked = $("#technicalIssuesCheckbox").get(0).checked;
    let sessionDurationChecked = $("#sessionDurationCheckbox").get(0).checked;
    let rubriceRatingChecked = $("#rubriceRatingCheckbox").get(0).checked;

    technicalIssuesHasChecked = technicalIssuesChecked;
    sessionDurationHasChecked = sessionDurationChecked
    rubriceRatingHasChecked = rubriceRatingChecked;

    $("#technicalIssuesTag").css("display", technicalIssuesHasChecked ? "inline-block" : "none");
    $("#sessionDurationTag").css("display", sessionDurationHasChecked ? "inline-block" : "none");
    $("#rubriceRatingTag").css("display", rubriceRatingHasChecked ? "inline-block" : "none");

    $('#myModal').modal('hide');

    getAndRenderListData();
}

function toDetailPage(index) {
    let item = tableData[index];
    //let viewId = item.viewId;
    let tutor = item.tutor;
    let sessionId = item.sessionId;
    let date = item.date;

    window.location.href = `./detail.html?&tutor=${tutor}&sessionId=${sessionId}&date=${date}`;
}


function init() {

    $('#dlgAddOpenWindow').on('show.bs.modal', function (event) {
        var Id = $("#Id").val();
        var Name = $("#Name").val();
        var modal = $(this);
        modal.find('.modal-body input[id=hidId]').attr("value", Id);
        modal.find('.modal-body input[id=Name]').attr("value", Name);
    });
    $('#dlgAddOpenWindow').on('hide.bs.modal', function (e) {
    });


    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        autoclose: true,
        viewMode: 'days',
        icons: {
            today: 'fa fa-caret-square-o-right',
            clear: 'fa fa-trash-o',
            close: 'fa fa-close'
        },
    });

    $('#datetimepicker2').datetimepicker({
        format: 'YYYY-MM-DD',
        autoclose: true,
        viewMode: 'days',
        icons: {
            today: 'fa fa-caret-square-o-right',
            clear: 'fa fa-trash-o',
            close: 'fa fa-close'
        },
    });

}


