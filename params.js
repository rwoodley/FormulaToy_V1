function shareFormula() {
    //alert(location.protocol + '//' + location.host + location.pathname);
    var tempName = parseInt((new Date()).getTime() / 1000);
    var root = location.protocol + '//' + location.host + location.pathname;
    var url = root + _params.toURL() + "&" + tempName;
    document.getElementById('MatrixURL').value = url;
    document.getElementById("shareTW").href = 'http://twitter.com/share?text=My%20Formula.&url=' + url;
    document.getElementById("shareFB").href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
    document.getElementById("shareEmail").href = "mailto:?subject=My%20Formula&body=" + encodeURIComponent(url); // double-encoding seems to be required here.
    document.getElementById('modalBackground').style.display = 'block';
    var el = document.getElementById('ShareDiv');
    el.style.display = 'block';
    el.style.position = 'absolute';
    var top = 20;
    var left = 20;
    el.style.top = top + "px";
    el.style.left = left + "px";
}
function params() {
    this.formula = "z = 1";
    this.spin = true;
    this.spinSpeed = Math.PI / 256;
    this.displayOutline = false;
    this.X = 0;
    this.Y = 0;
    this.Z = 1;
    this.system = "spherical";
    this.color = "#ff0000"; // color (change "#" to "0x")
    this.colorS = "#ffff00"; // color (change "#" to "0x")
    this.shininess = 30;
    this.opacity = 1;
    this.material = "Phong";
    this.draw = function () { userClickedDraw() };
    this.help = function () {
        var win = window.open('Help.html', '_blank');
        win.focus();
    };
    this.share = function () { shareFormula() };
    this.toURL = function () {
        var sb = '';
        sb += '?formula=' + encodeURI(this.formula);
        sb += '&system=' + encodeURI(this.system);
        sb += '&color=' + encodeURI(this.color.replace('#','0x'));
        sb += '&shininess=' + encodeURI(this.shininess);
        sb += '&opacity=' + encodeURI(this.opacity);
        sb += '&material=' + encodeURI(this.material);
        return sb;
    };
    this.initFromURL = function() {
        var systemParam = getParameterByName('system');
        if (systemParam != '') _params.system = systemParam;

        var formulaParam = getParameterByName('formula');
        if (formulaParam != '') {
            var cleanFormula = getCleanFormula(_params.system, formulaParam);
            if (cleanFormula != null) _params.formula = cleanFormula;
        }
        var tmpParam;
        tmpParam = getParameterByName('color');
        if (tmpParam != '') _params.color = tmpParam.replace('0x','#');
        tmpParam = getParameterByName('shininess');
        if (tmpParam != '') _params.shininess = parseInt(tmpParam);
        tmpParam = getParameterByName('opacity');
        if (tmpParam != '') _params.opacity = parseFloat(tmpParam);
        tmpParam = getParameterByName('material');
        if (tmpParam != '') _params.material = tmpParam;
    }
}