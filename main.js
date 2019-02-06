const screen = {};
const starRoot = 10;
let maxSheep = 3;
let count = 0;

const id = id => document.getElementById(id);

function randomRange(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomElement(list) {
    return list[Math.floor(Math.random()*list.length)];
}

function html(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

let transitioningScreen = false;
function showScreen(screenId) {
    if (transitioningScreen) return;
    transitioningScreen = true;
    const currentScreenStyle = id(screenId).style;
    currentScreenStyle.transition = 'none';
    currentScreenStyle.right = '100%';
    currentScreenStyle.zIndex = 1;
    currentScreenStyle.display = 'block';
    currentScreenStyle.transition = '';
    
    setTimeout(() => {
        currentScreenStyle.right = 0;
    }, 250);

    setTimeout(() => {
        [].forEach.call(document.querySelectorAll('.screen'), el => {
            if (el.id === screenId) return;
            el.style.display = 'none';
        });
        transitioningScreen = false;
    }, 1200);
}

function updateCount() {
    count++;
    id('count').innerText = count;
}

function threadBg() {
    const colors = [
        '#aff', '#faf', '#ffa',
        '#aaf', '#afa', '#faa',
    ];
    return randomElement(colors);
}

function addStar(x, y) {
    const starWidth = randomRange(screen.width*0.03, screen.width*0.2);
    const top = x * (screen.height+starWidth/2) - starWidth/2;
    const left = y * (screen.width+starWidth/2) - starWidth/2;
    const rotate = randomRange(0, 359);
    const starStyle = `top: ${top}px; left: ${left}px; transform: rotate(${rotate}deg); width: ${starWidth}px`;
    const star = html(`<img class="star" src="star.png" style="${starStyle}">`);
    id('game').appendChild(star);
}

function addSheep(x) {
    const height = screen.height;
    const halfSheepHeight = 50;
    const threadHeight = screen.height/2;
    const style = `left: ${screen.width*x}px; height: ${height}px; top: -${screen.height}px; background: ${threadBg()}`;
    const sheepStyle = `top: ${(height - halfSheepHeight)}px`;
    const sheep = `<img class="sheep" src="sheep.png" style="${sheepStyle}">`;
    const threadedSheep = html(`<div class="thread" style="${style}">${sheep}</div>`);
    setTimeout(() => {
        const offset = 100 * Math.sin(Math.random()*10) - threadHeight;
        threadedSheep.style.top = `${offset}px`;
    }, 500);
    id('game').appendChild(threadedSheep);

    let alive = true;
    const touchSheep =  () => {
        if (!alive) return;
        updateCount();
        threadedSheep.style.top = `-${screen.height}px`;
        threadedSheep.querySelector('img').style.animation = 'spin 1s linear infinite';
        alive = false;

        setTimeout(() => {
            threadedSheep.remove();
            addSheep(Math.random());
        }, 1000);
    };
    threadedSheep.addEventListener('touchstart', touchSheep);
    threadedSheep.addEventListener('mousedown', touchSheep);
}

function initGame() {
    for (let i = 0; i < starRoot; i++) {
        for (let j = 0; j < starRoot; j++) {
            if ((i + j) % 2 === 0) {
                addStar(i/starRoot, j/starRoot);
            }
        }
    }
    for (let i = 0; i < maxSheep; i++) {
        addSheep(i/(maxSheep-1));
    }
}

function init() {
    function resize () {
        const e = document.documentElement;
        const b = document.getElementsByTagName('body')[0];
        screen.width = window.innerWidth || e.clientWidth || b.clientWidth;
        screen.height = window.innerHeight || e.clientHeight || b.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    [].forEach.call(document.querySelectorAll('.nav'), el => el.addEventListener('click', e => {
        e.preventDefault();
        showScreen(el.dataset.screen);
    }));

    id('start').style.display = 'block';
    initGame();
}

init();