var qrcodeBox = document.getElementById('qrcode');

function generator(url) {
    qrcodeBox.innerHTML = '';
    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 148,
        height: 148,
        colorDark: "#000",
        colorLight: "#efefef",
        correctLevel: QRCode.CorrectLevel.H
    });
}

document.addEventListener('DOMContentLoaded', function () {
    generator(location.href);
    chrome && chrome.tabs && chrome.tabs.getSelected(null, function (tab) {
        setTimeout(function () {
            generator(tab.url);
        }, 0);
    });
    
});

window.addEventListener('pageshow', function(event) {
    generator(location.href);

});