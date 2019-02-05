const screen = {};
const id = id => document.getElementById(id);
let maxSheep = 3;
let count = 0;

function html(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function showScreen(screenId) {
    [].forEach.call(document.querySelectorAll('.screen'), el => el.style.display = '');
    id(screenId).style.display = 'flex';
}

function updateCount() {
    count++;
    id('count').innerText = count;
}

function addSheep(x) {
    const height = screen.height;
    const style = `left: ${screen.width*x}px; height: ${height}px; top: -${screen.height}px`;
    const sheepStyle = `top: ${(height - 50)}px`;
    const threadedSheep = html(`<div class="thread" style="${style}"><img class="sheep" src="sheep.png" style="${sheepStyle}"></div>`);
    setTimeout(() => {
        const offset = Math.random() * 50 - 200;
        threadedSheep.style.top = `${offset}px`;
    }, 500);
    id('game').appendChild(threadedSheep);

    threadedSheep.addEventListener('click', () => {
        updateCount();
        threadedSheep.style.top = `-${screen.height}px`;
        threadedSheep.querySelector('img').style.animation = 'spin 1s linear infinite';

        setTimeout(() => {
            threadedSheep.remove();
            addSheep(Math.random());
        }, 1000);
    });
}

function initGame() {
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