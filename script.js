/** getAllUrlParams function (C) 2020 Yaphi Berhanu, James Hibbard */
function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&zd_');

        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('_str=');
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            if (paramName.match(/\[(\d+)?\]$/)) {

                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];
                if (paramName.match(/\[\d+\]$/)) {
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName].push(paramValue);
                }
            }
        }
    }
    return obj;
}

if (document.URL.indexOf("/p/survey") >= 0) {
    if (document.URL.indexOf("#") >= 0) {
        // handle '#' anchor for tickets such as "re: ticket #1234"
        window.location.href = document.URL.replace(/\#/g, '%23');
    }
    document.getElementById("survey-ticket-id").innerText = decodeURIComponent(getAllUrlParams().id);
    try {
        document.getElementById("survey-subject").innerText = decodeURIComponent((getAllUrlParams().subj).replace(/\+/g, ' '));
    } catch {
        document.getElementById("survey-subject").innerText = decodeURIComponent(getAllUrlParams().subj);
    }
    document.getElementById("survey-good").setAttribute('onclick', "location.href='" + decodeURIComponent(getAllUrlParams().url) + "&intention=16';");
    document.getElementById("survey-bad").setAttribute('onclick', "location.href='" + decodeURIComponent(getAllUrlParams().url) + "&intention=4';");
}

if (document.URL.indexOf("/p/survey") >= 0) {
    if (document.URL.indexOf("url_str") < 0 || document.URL.indexOf("zd_id_str") < 0 || document.URL.indexOf("zd_subj_str") < 0) {
        //check if ALL params exist, else we should show an error message
        document.getElementById("survey-error").style.display = 'block';
        // then redirect to the help center homepage
        setTimeout(function () {
            window.location.href = 'https://YOUR-HELP-CENTER.zendesk.com/'; // replace YOUR-HELP-CENTER with your HC name
        }, 6000);
    } else {
        document.getElementById("survey").style.display = 'block';
    }
}