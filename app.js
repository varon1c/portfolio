const projects = [
  {
    id: 'trade-journal',
    category: 'WEB APP',
    filter: 'web',
    title: 'TradeJournal',
    description: 'A private trading journal for recording trades, reviewing performance, and learning from wins and losses.',
    problem: 'Trading decisions are easier to reflect on when the record is consistent and results are easy to review.',
    highlights: [
      'Private accounts with user-scoped trade records.',
      'Dashboard metrics for win rate, streaks, profit and loss, and monthly trends.',
      'A React client connected to an Express API and PostgreSQL.',
    ],
    tags: ['React', 'Express', 'PostgreSQL', 'Vite'],
    repo: 'https://github.com/varon1c/TradeJournal',
    live: 'https://tradejournalvaron1c.vercel.app',
    visual: 'trade',
  },
  {
    id: 'drowsiness-detector',
    category: 'COMPUTER VISION',
    filter: 'vision',
    title: 'Drowsiness Detector',
    description: 'A real-time driver drowsiness detector that combines webcam-based eye analysis with alerts to an Android phone over a local hotspot.',
    problem: 'A single blink is not the same as sustained drowsiness. The detector combines eye signals over time and checks other signs such as yawning and head direction.',
    highlights: [
      'Combines Eye Aspect Ratio (EAR) with a CNN eye-state classifier.',
      'Tracks PERCLOS, yawning, and head direction with per-driver calibration.',
      'Sends alerts to a companion Android app over a local hotspot without internet.',
    ],
    tags: ['Python', 'OpenCV', 'EAR', 'CNN', 'PERCLOS', 'Android'],
    repo: 'https://github.com/kurtzk10/drowsiness-detector/tree/build1.2.3',
    live: null,
    visual: 'vision',
  },
  {
    id: 'weather-clothing',
    category: 'WEB APP',
    filter: 'web',
    title: 'Weather & Clothing Choice',
    description: 'An app that suggests what to wear for a selected city in the Philippines, using current weather and simple language.',
    problem: 'Forecast details can be hard to turn into a quick, practical outfit decision.',
    highlights: [
      'Choose a Philippine province and city or municipality.',
      'Get clothing suggestions, reminders, and a simple look at the next few hours.',
      'Uses Streamlit with weather and clothing-image search services.',
    ],
    tags: ['Python', 'Streamlit', 'OpenWeather'],
    repo: 'https://github.com/varon1c/Weather-and-Clothing-Choice-',
    live: null,
    visual: 'weather',
  },
  {
    id: 'tapendance',
    category: 'OFFLINE-FIRST SYSTEM',
    filter: 'systems',
    title: 'TAPENDANCE',
    description: 'An NFC attendance system for service fleets, with an Android scanner that queues scans locally and syncs when connectivity returns.',
    problem: 'A network drop should not stop a driver from recording attendance.',
    highlights: [
      'The Expo scanner stores pending NFC records in SQLite.',
      'A Node and Express API syncs batches with MySQL transactions.',
      'A browser dashboard lets coordinators review synced trip and attendance data.',
    ],
    tags: ['Expo', 'SQLite', 'NFC', 'Express', 'MySQL'],
    repo: 'https://github.com/varon1c/TAPENDANCE',
    live: null,
    visual: 'tapendance',
  },
  {
    id: 'haupokemon',
    category: 'CLOUD & MOBILE APP',
    filter: 'systems',
    title: 'HAUPokemon Monster App',
    description: 'A monster-tracking mobile app backed by a distributed cloud system spanning AWS regions.',
    problem: 'The application needs to connect mobile gameplay to shared data across a multi-region cloud architecture.',
    highlights: [
      'Managed the MySQL database instance on Amazon RDS in US-East-1 and designed its schema.',
      'Worked with an API and React mobile frontend connected to AWS infrastructure.',
      'The project uses VPC peering and Tailscale to secure database access between regions.',
    ],
    tags: ['React', 'TypeScript', 'Capacitor', 'PHP', 'MySQL', 'AWS', 'RDS', 'VPC Peering'],
    repo: 'https://github.com/kevv1011/HAUPokemon-Monster-App',
    live: null,
    visual: 'pokemon',
  },
  {
    id: 'serverless-ec2-dashboard',
    category: 'SERVERLESS CLOUD TOOL',
    filter: 'systems',
    title: 'Serverless EC2 Dashboard',
    description: 'A focused interface for checking EC2 instance status and sending start or stop actions.',
    problem: 'Routine EC2 instance controls can be exposed through a lightweight dashboard without keeping an application server running.',
    highlights: [
      'Displays instance state and offers start/stop actions.',
      'Uses AWS Lambda and API Gateway for serverless operations.',
      'Built with HTML and JavaScript.',
    ],
    tags: ['AWS Lambda', 'API Gateway', 'EC2', 'HTML', 'JavaScript'],
    repo: null,
    contactUrl: 'mailto:charlesjansenmanusig@gmail.com?subject=Serverless%20EC2%20Dashboard%20architecture',
    contactLabel: 'Ask about the architecture ↗',
    live: null,
    visual: 'serverless',
  },
];

const skillGroups = [
  { name: 'Web & interfaces', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Tailwind CSS', 'Capacitor'] },
  { name: 'Backend & data', items: ['Node.js', 'Express', 'PHP', 'Python', 'SQL', 'PostgreSQL', 'SQLite', 'MySQL'] },
  { name: 'Applied AI', items: ['OpenCV', 'MediaPipe', 'CNN', 'PERCLOS', 'PyTorch', 'TensorFlow'] },
  { name: 'Cloud & tools', items: ['AWS', 'Lambda', 'API Gateway', 'EC2', 'RDS', 'VPC Peering', 'Git', 'GitHub', 'Expo', 'Streamlit', 'NFC'] },
];

const projectSkills = {
  'trade-journal': ['JavaScript', 'React', 'Vite', 'Express', 'PostgreSQL', 'SQL', 'Tailwind CSS'],
  'drowsiness-detector': ['Python', 'OpenCV', 'CNN', 'PERCLOS', 'MediaPipe', 'PyTorch', 'TensorFlow'],
  'weather-clothing': ['Python', 'Streamlit'],
  tapendance: ['JavaScript', 'React', 'Expo', 'Express', 'SQLite', 'MySQL', 'SQL', 'NFC'],
  haupokemon: ['React', 'TypeScript', 'Capacitor', 'PHP', 'MySQL', 'AWS', 'RDS', 'VPC Peering'],
  'serverless-ec2-dashboard': ['JavaScript', 'HTML', 'AWS', 'Lambda', 'API Gateway', 'EC2'],
};

const projectCarousel = document.querySelector('#project-carousel');
const dialog = document.querySelector('#project-dialog');
const dialogBody = document.querySelector('#dialog-body');
const toast = document.querySelector('#toast');
const menuToggle = document.querySelector('.menu-toggle');
const navigationLinks = document.querySelector('#navigation-links');
const skillFeedback = document.querySelector('#skill-feedback');
let selectedSkill = null;
let currentFilter = 'all';
let toastTimer;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = !reducedMotion && 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12 })
  : null;

function projectVisual(project) {
  if (project.visual === 'trade') {
    return `<div class="preview-window">
      <div class="preview-top"><span>TRADE JOURNAL / OVERVIEW</span><span class="preview-dots"><i></i><i></i><i></i></span></div>
      <h4 class="preview-heading">A moment to review.</h4><p class="preview-caption">Performance dashboard</p>
      <div class="preview-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    </div>`;
  }
  if (project.visual === 'vision') {
    return `<div class="preview-window">
      <div class="preview-top"><span>DRIVER / CAMERA</span><span>LIVE ANALYSIS</span></div>
      <div class="camera-preview" aria-hidden="true"><span class="camera-outline"></span><span class="camera-status">EAR + CNN · LOCAL ALERT</span></div>
    </div>`;
  }
  if (project.visual === 'weather') {
    return `<div class="preview-window">
      <div class="preview-top"><span>WEATHER NOTES</span><span>PH / TODAY</span></div>
      <h4 class="preview-heading">Dress for the day.</h4>
      <div class="weather-preview"><div><span class="weather-sun" aria-hidden="true">☼</span><div class="weather-place">Choose your city</div><div class="weather-condition">A simpler forecast</div></div><div class="weather-tip"><span>Suggestion</span><b>Outfit + reminders</b></div><div class="weather-hours"><span>NOW</span><span>NEXT HOURS</span><span>QUICK TIPS</span></div></div>
    </div>`;
  }
  if (project.visual === 'pokemon') {
    return `<div class="preview-window">
      <div class="preview-top"><span>HAUPOKEMON / FIELD GUIDE</span><span>COLLECTION</span></div>
      <div class="pokemon-preview"><div class="pokemon-orbit" aria-hidden="true"><span class="pokemon-sprite"></span></div><div><h4 class="preview-heading">Discover nearby.</h4><p class="preview-caption">Track monsters. Explore together.</p><div class="pokemon-status"><i></i> CLOUD SYNC ACTIVE</div></div></div>
    </div>`;
  }
  if (project.visual === 'serverless') {
    return `<div class="preview-window">
      <div class="preview-top"><span>EC2 CONTROL / DASHBOARD</span><span>SERVERLESS</span></div>
      <h4 class="preview-heading">Instance overview</h4>
      <div class="serverless-preview"><div><span>INSTANCE STATE</span><b><i></i> Running</b></div><div class="serverless-actions"><span>Start instance</span><span>Stop instance</span></div><p>Lambda <span>→</span> API Gateway <span>→</span> EC2</p></div>
    </div>`;
  }
  return `<div class="preview-window">
    <div class="preview-top"><span>FLEET / ATTENDANCE</span><span>OFFLINE FIRST</span></div>
    <h4 class="preview-heading">Capture first. Sync later.</h4>
    <div class="fleet-preview"><div class="fleet-map" aria-hidden="true"><i></i><i></i></div><div class="fleet-rows"><span>Tap saved <b>✓</b></span><span>Waiting for signal <b>…</b></span><span>Sync when online <b>↗</b></span></div></div>
  </div>`;
}

function renderProject(project) {
  const tags = project.tags.map(tag => `<span>${tag}</span>`).join('');
  const primaryUrl = project.live || project.repo || project.contactUrl;
  const primaryLabel = project.live ? 'Live app ↗' : project.repo ? 'GitHub ↗' : project.contactLabel;
  const primaryAction = primaryUrl ? `<a class="repo-link" href="${primaryUrl}" ${project.repo || project.live ? 'target="_blank" rel="noreferrer"' : ''}>${primaryLabel}</a>` : '';
  return `<article class="project-card" data-project-id="${project.id}" data-category="${project.filter}" data-reveal>
    <div class="project-visual visual-${project.visual}" aria-hidden="true">${projectVisual(project)}</div>
    <div class="project-card-content">
      <p class="project-category">${project.category}</p>
      <h3>${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags" aria-label="${project.title} technologies">${tags}</div>
      <div class="project-card-actions">
        <button class="project-detail-button" type="button" data-project-details="${project.id}">Project details <span aria-hidden="true">→</span></button>
        ${primaryAction}
      </div>
    </div>
  </article>`;
}

function renderProjects() {
  projectCarousel.innerHTML = projects.map(renderProject).join('');
  updateProjectCards();
  updateCarouselButtons();
  if (revealObserver) projectCarousel.querySelectorAll('[data-reveal]').forEach(card => revealObserver.observe(card));
}

function updateProjectCards() {
  let visibleCount = 0;
  projectCarousel.querySelectorAll('.project-card').forEach(card => {
    const show = currentFilter === 'all' || card.dataset.category === currentFilter;
    card.hidden = !show;
    card.classList.toggle('skill-match', Boolean(selectedSkill && projectSkills[card.dataset.projectId]?.includes(selectedSkill)));
    if (show) visibleCount += 1;
  });
  document.querySelector('#project-count').textContent = String(visibleCount);
  document.querySelector('.project-count').setAttribute('aria-label', `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`);
  document.querySelectorAll('[data-filter]').forEach(button => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  updateCarouselButtons();
}

function updateCarouselButtons() {
  const previous = document.querySelector('[data-scroll="previous"]');
  const next = document.querySelector('[data-scroll="next"]');
  const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
  previous.disabled = projectCarousel.scrollLeft <= 2;
  next.disabled = maxScroll <= 2 || projectCarousel.scrollLeft >= maxScroll - 2;
}

function openProjectDetails(projectId) {
  const project = projects.find(item => item.id === projectId);
  if (!project) {
    showToast('Project details are not available.');
    return;
  }
  const highlights = project.highlights.map(item => `<li>${item}</li>`).join('');
  const tags = project.tags.map(tag => `<span>${tag}</span>`).join('');
  const liveAction = project.live ? `<a href="${project.live}" target="_blank" rel="noreferrer">Visit live app ↗</a>` : '';
  const repoAction = project.repo ? `<a href="${project.repo}" target="_blank" rel="noreferrer">Explore source on GitHub ↗</a>` : '';
  const contactAction = project.contactUrl ? `<a href="${project.contactUrl}">${project.contactLabel}</a>` : '';
  dialogBody.innerHTML = `<p class="dialog-category">${project.category}</p>
    <h2 class="dialog-title" id="dialog-title">${project.title}</h2>
    <p class="dialog-subtitle">${project.description}</p>
    <div class="dialog-columns">
      <div><h3>The problem</h3><p>${project.problem}</p></div>
      <div><h3>What it does</h3><ul>${highlights}</ul></div>
    </div>
    <div class="dialog-tags">${tags}</div>
    <div class="dialog-actions">${liveAction}${repoAction}${contactAction}</div>`;
  dialog.showModal();
  dialog.querySelector('.dialog-close').focus();
}

function renderSkills() {
  const container = document.querySelector('#skill-groups');
  container.innerHTML = skillGroups.map((group, index) => `<section class="skill-group" aria-labelledby="skill-group-${index}">
    <h3 id="skill-group-${index}">${group.name}<span>${String(group.items.length).padStart(2, '0')}</span></h3>
    <div class="skill-list">${group.items.map(skill => `<button class="skill-chip" type="button" data-skill="${skill}" aria-pressed="false">${skill}</button>`).join('')}</div>
  </section>`).join('');
}

function selectSkill(skill) {
  selectedSkill = selectedSkill === skill ? null : skill;
  document.querySelectorAll('[data-skill]').forEach(button => {
    const selected = button.dataset.skill === selectedSkill;
    button.setAttribute('aria-pressed', String(selected));
  });
  updateProjectCards();
  if (!selectedSkill) {
    skillFeedback.textContent = 'Select a skill to highlight related projects.';
    return;
  }
  const related = projects.filter(project => projectSkills[project.id]?.includes(selectedSkill));
  const additionalWork = {
    'Node.js': ['HAUnted Sightings'],
    'AWS': ['Multi-region AWS'],
    'EC2': ['Multi-region AWS'],
    'RDS': ['Multi-region AWS'],
  }[selectedSkill] || [];
  const names = [...related.map(project => project.title), ...additionalWork].join(', ');
  skillFeedback.innerHTML = names
    ? `${selectedSkill} appears in: ${names}. <a href="${additionalWork.length && !related.length ? '#experience' : '#projects'}">See work ↑</a><button class="clear-skill" type="button">Clear</button>`
    : `${selectedSkill} is in the toolkit; no featured project lists it yet. <button class="clear-skill" type="button">Clear</button>`;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
}

renderProjects();
renderSkills();
document.querySelector('#current-year').textContent = String(new Date().getFullYear());

document.querySelector('.project-filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  currentFilter = button.dataset.filter;
  projectCarousel.scrollTo({ left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  updateProjectCards();
});

document.querySelector('.carousel-controls').addEventListener('click', event => {
  const button = event.target.closest('[data-scroll]');
  if (!button) return;
  const direction = button.dataset.scroll === 'next' ? 1 : -1;
  projectCarousel.scrollBy({ left: direction * projectCarousel.clientWidth * .78, behavior: reducedMotion ? 'auto' : 'smooth' });
});

projectCarousel.addEventListener('scroll', updateCarouselButtons, { passive: true });
window.addEventListener('resize', updateCarouselButtons);

projectCarousel.addEventListener('click', event => {
  const button = event.target.closest('[data-project-details]');
  if (button) openProjectDetails(button.dataset.projectDetails);
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#skill-groups').addEventListener('click', event => {
  const skillButton = event.target.closest('[data-skill]');
  if (skillButton) selectSkill(skillButton.dataset.skill);
});

skillFeedback.addEventListener('click', event => {
  if (!event.target.closest('.clear-skill')) return;
  selectedSkill = null;
  document.querySelectorAll('[data-skill]').forEach(button => button.setAttribute('aria-pressed', 'false'));
  updateProjectCards();
  skillFeedback.textContent = 'Select a skill to highlight related projects.';
});

document.querySelector('.case-tabs').addEventListener('click', event => {
  const tab = event.target.closest('[role="tab"]');
  if (tab) activateCaseTab(tab);
});

function activateCaseTab(tab) {
  document.querySelectorAll('.case-tabs [role="tab"]').forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  document.querySelectorAll('.case-panel').forEach(panel => {
    panel.hidden = panel.id !== tab.getAttribute('aria-controls');
  });
}

document.querySelector('.case-tabs').addEventListener('keydown', event => {
  const tabs = [...document.querySelectorAll('.case-tabs [role="tab"]')];
  const index = tabs.indexOf(event.target);
  if (index < 0) return;
  let next = index;
  if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = tabs.length - 1;
  else return;
  event.preventDefault();
  activateCaseTab(tabs[next]);
  tabs[next].focus();
});

document.querySelector('#copy-profile').addEventListener('click', async () => {
  const profileUrl = 'https://github.com/varon1c';
  try {
    await navigator.clipboard.writeText(profileUrl);
    showToast('GitHub profile link copied.');
  } catch {
    showToast('Could not access the clipboard. Use the GitHub profile link instead.');
  }
});

const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  themeColor.setAttribute('content', theme === 'dark' ? '#171c19' : '#e9f0e9');
  if (!persist) return;
  try {
    localStorage.setItem('charles-portfolio-theme', theme);
  } catch {
    showToast('Theme changed, but this browser cannot save the preference.');
  }
}

try {
  const savedTheme = localStorage.getItem('charles-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
} catch {
  showToast('Theme preference could not be loaded in this browser.');
}

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme, true);
});

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  navigationLinks.classList.toggle('is-open', !open);
});

navigationLinks.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navigationLinks.classList.remove('is-open');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigationLinks.classList.remove('is-open');
  }
});

if (revealObserver) {
  document.body.classList.add('reveal-ready');
  projectCarousel.querySelectorAll('[data-reveal]').forEach(card => revealObserver.observe(card));
}

if ('IntersectionObserver' in window) {
  const sections = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.navigation-links a[href^="#"]').forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
}
