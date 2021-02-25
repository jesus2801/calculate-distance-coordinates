var UserInterface = /** @class */ (function () {
    function UserInterface() {
        this.x1Val = document.getElementById('x1');
        this.y1Val = document.getElementById('y1');
        this.x2Val = document.getElementById('x2');
        this.y2Val = document.getElementById('y2');
        this.resultsList = document.querySelector('.results');
        this.button = document.querySelector('button');
    }
    UserInterface.prototype.printStep = function (step) {
        var li = document.createElement('li');
        li.innerText = step;
        this.resultsList.appendChild(li);
    };
    UserInterface.prototype.printResults = function (reuslts) {
        var li = document.createElement('li');
        li.innerHTML = "<b>" + reuslts + "</b>";
        this.resultsList.appendChild(li);
    };
    UserInterface.prototype.showErrorMessage = function (err) {
        //@ts-ignore
        Swal.fire('!Error!', err, 'error');
    };
    UserInterface.prototype.showLoader = function () {
        //@ts-ignore
        this.loader = Swal.fire({
            title: 'Cargando',
            didOpen: function () {
                //@ts-ignore
                Swal.showLoading();
            }
        });
    };
    UserInterface.prototype.removeLoader = function () {
        this.loader.close();
    };
    return UserInterface;
}());
var UI = new UserInterface();
UI.showLoader();
window.addEventListener('load', function () { return UI.removeLoader(); });
UI.button.addEventListener('click', function () {
    var x1 = UI.x1Val.value.trim();
    var y1 = UI.y1Val.value.trim();
    var x2 = UI.x2Val.value.trim();
    var y2 = UI.y2Val.value.trim();
    if (isEmpty(x1, x2, y1, y2)) {
        return UI.showErrorMessage('Por favor, rellene correctamente todos los campos.');
    }
    UI.resultsList.innerHTML = '';
    console.log(eval(x1), eval(y1), eval(x2), eval(y2));
    calculateDistance(eval(x1), eval(y1), eval(x2), eval(y2));
});
UI.x1Val.addEventListener('input', validateString);
UI.x2Val.addEventListener('input', validateString);
UI.y1Val.addEventListener('input', validateString);
UI.y2Val.addEventListener('input', validateString);
function validateString(e) {
    if (/[A-z]/.test(e.target.value)) {
        var t = e.target.value;
        e.target.value = t.substring(0, t.length - 1);
    }
}
function isEmpty() {
    var strings = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strings[_i] = arguments[_i];
    }
    return strings.some(function (str) { return str.trim() === ''; });
}
function calculateDistance(x1, y1, x2, y2) {
    UI.printStep("d = \u221A(x2 - x1)^2 + (y1 - y2)^2");
    UI.printStep("d = \u221A(" + x2 + " - " + x1 + ")^2 + (" + y1 + " - " + y2 + ")^2");
    var firstSubs = x2 - x1;
    var secondSubs = y1 - y2;
    UI.printStep("d = \u221A(" + firstSubs + ")^2 + (" + secondSubs + ")^2");
    var firstPower = Math.pow(firstSubs, 2);
    var secondPower = Math.pow(secondSubs, 2);
    UI.printStep("d = \u221A" + firstPower + " + " + secondPower);
    var addition = firstPower + secondPower;
    UI.printStep("d = \u221A" + addition);
    var results = Math.sqrt(addition);
    UI.printResults("d = " + results);
}
