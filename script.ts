// define interface for html element;

interface Nav {
	menuBar: HTMLElement | null;
	menuBtn: HTMLElement | null;
	closeBtn: HTMLElement | null;
	navContainer: HTMLElement | null;
}

// interface aboutElement
interface AboutElement {
	readMoreBtn: HTMLElement | null;
	readMoreContent: HTMLElement | null;
}

// type garde
function isHTMLElement(element: any): element is HTMLElement {
	return element instanceof HTMLElement;
}

const query = (selector: string): HTMLElement | null =>
	document.querySelector(selector);

// select the html element
const nav: Nav = (() => {
	return {
		menuBar: query('.menu-bar'),
		menuBtn: query('.menu-btn'),
		closeBtn: query('.close-btn'),
		navContainer: query('nav'),
	};
})();

// active menu button click handler
const menu = (() => {
	const menuItem = nav.menuBar?.querySelectorAll('a');
	if (!menuItem) return;

	menuItem.forEach((item) => {
		if (!isHTMLElement(item)) return;
		item.addEventListener('click', function () {
			menuItem.forEach((element) =>
				element.classList.remove('active-menu')
			);
			item.classList.add('active-menu');
		});
	});
	return menuItem;
})();

const about: AboutElement = (() => {
	return {
		readMoreBtn: query('.read-more'),
		readMoreContent: query('.read-more-content'),
	};
})();

function toggleElement(e: HTMLElement) {
	const items = e.querySelector('.items');
	if (items) items.classList.toggle('show');
}

// show and hide the skills item
const skillsSection = (() => {
	const skills = document.querySelectorAll('#skills .skill');
	skills.forEach((element) => {
		if (!isHTMLElement(element)) return;
		element.addEventListener('click', () => toggleElement(element));
	});
	return { skills };
})();

// show mobile menu bar when clicking on the menu bar button
nav.menuBtn?.addEventListener('click', () => {
	// menuBar.style.display = 'block';
	if (nav.menuBar) {
		nav.menuBar.classList.add('active');
	}
	if (nav.menuBtn) {
		nav.menuBtn.style.display = 'none';
	}
	if (nav.closeBtn) {
		nav.closeBtn.style.display = 'block';
	}
});

// hide mobile menu bar when clicking on the menu bar button
nav.closeBtn?.addEventListener('click', () => {
	// menuBar.style.display = 'none';
	if (nav.menuBar) {
		nav.menuBar?.classList.remove('active');
	}
	if (nav.menuBtn) {
		nav.menuBtn.style.display = 'block';
	}
	if (nav.closeBtn) {
		nav.closeBtn.style.display = 'none';
	}
});

// show and hide the read-more content
about.readMoreBtn?.addEventListener('click', () => {
	if (about.readMoreContent) {
		const isShowing =
			about.readMoreContent?.classList.toggle('show-content');

		return ((about.readMoreBtn as HTMLElement).innerText = isShowing
			? 'Show less'
			: 'Show more');
	}
});

// show box shadow down the navbar when scrolling down
let isThrottled = false;
window.addEventListener('scroll', () => {
	if (!isThrottled) {
		requestAnimationFrame(() => {
			nav.navContainer?.classList.toggle(
				'nav-box-shadow',
				window.scrollY > 50
			);
			isThrottled = false;
		});
		isThrottled = true;
	}
});

// progress bar width setter
(() => {
	const progressBars = document.querySelectorAll('.progress-bar');
	progressBars.forEach((bar) => {
		if (!isHTMLElement(bar)) return;
		const widthElement = bar.nextElementSibling;
		if (!isHTMLElement(widthElement)) return;
		const width = widthElement.innerText || '0%';
		const progress = bar.firstElementChild as HTMLElement;
		progress.style.width = width;
	});
})();
