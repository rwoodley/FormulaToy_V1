function shareFormula() {
    //alert(location.protocol + '//' + location.host + location.pathname);
    var tempName = parseInt((new Date()).getTime() / 1000);
    var root = location.protocol + '//' + location.host + location.pathname;
    var url = root + _params.toURL() + "&" + tempName;
    var cleanFormula = "Surface graph for " + encodeURIComponent("'" + _params.formula + "'");
    document.getElementById('MatrixURL').value = url;
    document.getElementById("shareEmail").href = "mailto:?subject=" + cleanFormula + "&body=" + encodeURIComponent(url); // double-encoding seems to be required here.
    document.getElementById("shareTW").href = 'http://twitter.com/share?text=' + cleanFormula + '&url=' + encodeURIComponent(url);
    document.getElementById("shareFB").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    document.getElementById('modalBackground').style.display = 'block';
    var el = document.getElementById('ShareDiv');
    //var pngUrl = _renderer.domElement.toDataURL();
    //var image = document.getElementById('SnapPng');
    //image.src = pngUrl;
    ////var data = img.replace("data:image/png;base64,", "");
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
    this.Z = 0;
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
        //alert(this.formula);
        sb += '?formula=' + encodeURIComponent(this.formula);
        sb += '&system=' + encodeURIComponent(this.system);
        sb += '&color=' + encodeURIComponent(this.color.replace('#','0x'));
        sb += '&shininess=' + encodeURIComponent(this.shininess);
        sb += '&opacity=' + encodeURIComponent(this.opacity);
        sb += '&material=' + encodeURIComponent(this.material);
        return sb;
    };
    this.initFromURL = function() {
        var systemParam = getParameterByName('system');
        if (systemParam != '') _params.system = systemParam;

        var formulaParam = getParameterByName('formula');
        if (formulaParam != '') {
            var cleanFormula = getCleanFormula(_params.system, formulaParam);
            if (cleanFormula != null) _params.setFormula(cleanFormula);
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
    this.setFormula = function(newFormula){
        this.formula = newFormula;
        document.title = newFormula;
    }
}