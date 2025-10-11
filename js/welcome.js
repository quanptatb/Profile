// Welcome screen logic
const welcomeEl = document.getElementById('welcome');
const enterBtn = document.getElementById('enterSite');
const skipChk = document.getElementById('skipWelcome');
const skipToTeam = document.getElementById('skipToTeam');

function closeWelcome() {
    if (!welcomeEl) return;
    welcomeEl.classList.add('fade-out');
    setTimeout(() => welcomeEl.classList.add('hide'), 600);
}
