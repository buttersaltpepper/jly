
const mainContent = document.getElementById('maincontent');
const navItems = document.querySelectorAll('.nav-item a');


const ff = () => {
	const audio = new Audio("../mooo/hahaaaha.mp3");
	audio.volume = 0.2;
	return audio;
};

const contentCache = {};

const loadContent = (href) => {
	if (contentCache[href]) {
		mainContent.innerHTML = contentCache[href];
		updateCursor(href);
		return;
	}

	fetch(`pages/${href}.html`)
		.then(response => response.text())
		.then(html => {
			contentCache[href] = html;
			mainContent.innerHTML = html;
			updateCursor(href);
		})
		.catch(error => {
			console.error('error loading content:', error);
			mainContent.innerHTML = '<h1>damm my bad. skill issue</h1>';
		});
};

const updateCursor = (currentPage) => {
	navItems.forEach(item => {
		if (item.getAttribute('data-section') === currentPage) {
			item.classList.add('active-page');
		} else {
			item.classList.remove('active-page');
		}
	});
};





const keymap = {
	'1': 'prelude',
	'2': 'mainquests',
	'3': 'buffs',
	'q': 'loot',
	'w': 'settings',
};

navItems.forEach(item => {
	item.addEventListener('click', function(event) {
		event.preventDefault();
		const section = this.getAttribute('data-section');
		loadContent(section);
		ff().play();
	});
});

document.addEventListener('keydown', (e) => {
	const key = e.key.toLowerCase();

	if (keymap.hasOwnProperty(key)) {
		e.preventDefault();
		loadContent(keymap[key]);
		ff().play();

		const element = document.querySelector(
			'[data-keyboard-key="' + key + '"]'
		);
		element.classList.add('active');
	}
});

document.addEventListener('keyup', (ev) => {
	const key = ev.key;

	if (keymap.hasOwnProperty(key)) {
		const element = document.querySelector(
			'[data-keyboard-key="' + key + '"]'
		);
		element.classList.remove('active');
	};
});
loadContent('prelude');











fetch('coolcool.html')
	.then(response => response.text())
	.then(data => {
		document.getElementById('aestheticu').innerHTML = data;
	})
	.catch(error => console.error('oops', error));

function remainingGameTime() {
	const estTime = 82 * 365 * 24 * 60 * 60 * 1000;
	const start = new Date();
	const end = new Date("2078-01-01");
	const timeRemaining = end - start;

	const pct = (timeRemaining / estTime) * 100;

	document.querySelector('#hpbar').style.width = `${pct}%`
	document.querySelector('#hpbar').textContent = `${pct.toFixed()}%`

	const years = Math.floor(timeRemaining / (365 * 24 * 60 * 60 * 1000));
	const days = Math.floor(timeRemaining % (365 * 24 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000));
	const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

	const timeRemainingString = `hp: ≈${years}年${days}日${hours}時間`;
	document.querySelector('#hpDays').textContent = timeRemainingString;
}

remainingGameTime();
setInterval(remainingGameTime, 3600000);

function setMenuTopPosition() {
	const menu = document.querySelector('.menu');

	if (window.matchMedia("(max-width: 768px)").matches) {
		const nav = document.querySelector('.nav-grid');
		const totalHeight = menu.offsetHeight - nav.offsetHeight;
		menu.style.top = `-${totalHeight}px`;
	} else {
		// For screens larger than 768px, set the top to 50%
		menu.style.top = '50%';
	}
}


// Event listeners
document.addEventListener('DOMContentLoaded', setMenuTopPosition);
window.addEventListener('load', setMenuTopPosition);
window.addEventListener('resize', setMenuTopPosition);

setMenuTopPosition();






const playPauseBtn = document.getElementById('playPauseBtn');
const themeAudio = document.getElementById('themeAudio');
const playIcon = document.getElementById('playSvg');
const pauseIcon = document.getElementById('pauseSvg');

let playing = false;

playPauseBtn.addEventListener('click', () => {
	if (playing === false) {
		playing = true;
		// themeAudio.play();
		playIcon.style.display = 'none';
		pauseIcon.style.display = 'inline';
	} else {
		playing = false;
		// themeAudio.pause();
		playIcon.style.display = 'inline';
		pauseIcon.style.display = 'none';
	}
});















const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const moodIcon = document.querySelectorAll('#themeBtn svg');
const themes = ['kanagawa', 'gruvbox-light-theme', 'nord-theme'];
let currentThemeIndex = 0;

// Here's the updated setThemeAndIcon function to handle the SVG icons:
function setThemeAndIcon(index) {
	const newTheme = themes[index];
	body.className = newTheme;
	localStorage.setItem('setTheme', newTheme);
	moodIcon.forEach(icon => icon.style.display = 'none');
	moodIcon[index].style.display = 'inline';
}

const savedTheme = localStorage.getItem('setTheme') || 'kanagawa';
currentThemeIndex = themes.indexOf(savedTheme);
setThemeAndIcon(currentThemeIndex);

themeBtn.addEventListener('click', () => {
	currentThemeIndex = (currentThemeIndex + 1) % themes.length;
	setThemeAndIcon(currentThemeIndex);
});

moodIcon.forEach(icon => icon.style.pointerEvents = 'none');
