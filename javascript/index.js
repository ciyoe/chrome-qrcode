var btn = document.getElementById('btn');
var qrcodeBox = document.getElementById('qrcode');
var url = document.getElementById('url');


btn.addEventListener('click', function () {
    if (url.value.trim() === '') {
        url.value = '';
        return;
    }
    qrcodeBox.innerHTML = '';
    generator(url.value);
}, false);

function generator(url) {
    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 148,
        height: 148,
        colorDark: "#000",
        colorLight: "#efefef",
        correctLevel: QRCode.CorrectLevel.H
    });
}


chrome.tabs.getSelected(null, function (tab) {
    setTimeout(function () {
        generator(tab.url);
    }, 0);
});