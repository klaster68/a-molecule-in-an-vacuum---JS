// Данные со страницы
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// Молекла
class Molecule {
    x;
    y;
    angle;
    Vx;
    Vy;
    curV;
}
let arrMol = [];

// Данные на события
let timerID;
let flag = true;

// Данные для молекулы
const Pi = 3.14;
const R = 2, V = 1, N = 100;
let x, y, Vx, Vy, angle;

x = Math.floor(Math.random() * (canvas.width - R)) + R;
y = Math.floor(Math.random() * (canvas.height - R)) + R;
angle = Math.random() * (360 - 0) * Pi / 180;
Vx = Math.round(V * Math.sin(angle));
Vy = Math.round(V * Math.cos(angle));

function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
}

// Заполняем массив молекул
for (let i = 0; i < N; i++) {
    arrMol[i] = new Molecule;

    arrMol[i].x = Math.floor(Math.random() * (canvas.width - R)) + R;
    arrMol[i].y = Math.floor(Math.random() * (canvas.height - R)) + R;
    arrMol[i].angle = Math.random() * 360 * Pi / 180;
    arrMol[i].curV = Math.random() * (V - 0.1) + 0.1;
    arrMol[i].Vx = arrMol[i].curV * Math.sin(angle);
    arrMol[i].Vy = arrMol[i].curV * Math.cos(angle);
}

function drawMolecule() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < N; i++) {
        ctx.beginPath();

        arrMol[i].x = arrMol[i].x + arrMol[i].Vx;
        arrMol[i].y = arrMol[i].y + arrMol[i].Vy;

        if (arrMol[i].x > canvas.width - R) {
            arrMol[i].x = canvas.width - R;
            arrMol[i].Vx = -arrMol[i].Vx;
        }
        if (arrMol[i].x < R) {
            arrMol[i].x = R;
            arrMol[i].Vx = -arrMol[i].Vx;
        }
        if (arrMol[i].y > canvas.height - R) {
            arrMol[i].y = canvas.width - R;
            arrMol[i].Vy = -arrMol[i].Vy;
        }
        if (arrMol[i].y < R) {
            arrMol[i].y = R;
            arrMol[i].Vy = -arrMol[i].Vy;
        }

        ctx.arc(arrMol[i].x, arrMol[i].y, R, 0, getRadians(360));
        ctx.stroke();
    }
}

// Кнопки старт-стоп
start.addEventListener('click', () => {
    if(flag){
        timerID = setInterval(drawMolecule, 10);
        flag = false;
    }
});

stop.addEventListener('click', () => {
    if(!flag){
        clearInterval(timerID);
        flag = true;
    }
});
