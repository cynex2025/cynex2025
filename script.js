class WaterCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mousePos = { x: e.clientX, y: e.clientY };
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
            
            if (Math.abs(this.mousePos.x - this.lastMousePos.x) > 20 ||
                Math.abs(this.mousePos.y - this.lastMousePos.y) > 20) {
                this.createDroplet(this.lastMousePos.x, this.lastMousePos.y);
                this.lastMousePos = { ...this.mousePos };
            }
        });

        document.addEventListener('click', (e) => {
            this.createSplash(e.clientX, e.clientY);
            this.createRipple(e.clientX, e.clientY);
        });

        document.addEventListener('mousedown', () => {
            this.cursor.style.width = '15px';
            this.cursor.style.height = '15px';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.width = '20px';
            this.cursor.style.height = '20px';
        });
    }

    createSplash(x, y) {
        const splash = document.createElement('div');
        splash.className = 'splash';
        splash.style.left = `${x}px`;
        splash.style.top = `${y}px`;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';

            const angle = (Math.PI * 2 * i) / 8;
            const distance = 20 + Math.random() * 20;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            splash.appendChild(particle);
        }

        document.body.appendChild(splash);
        setTimeout(() => splash.remove(), 1000);
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x - 50}px`;
        ripple.style.top = `${y - 50}px`;

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    createDroplet(x, y) {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';
        droplet.style.left = `${x}px`;
        droplet.style.top = `${y}px`;

        document.body.appendChild(droplet);
        setTimeout(() => droplet.remove(), 1000);
    }
}

window.addEventListener('load', () => {
    new WaterCursor();
});

// Responsive Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close menu when clicking a link on mobile
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! Our AI will analyze and respond shortly.');
        this.reset();
    });
}
//slide
/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

//loader
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  loader.style.opacity = '0';
  setTimeout(function() {
    loader.style.display = 'none';
  }, 500); // Matches the transition duration
});

// Create particle effect for the movie section
const particlesContainer = document.querySelector('.particles');
const particlesCount = 30;

for (let i = 0; i < particlesCount; i++) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  
  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  
  // Random size
  const size = Math.random() * 5 + 3;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Random animation duration and delay
  const duration = Math.random() * 10 + 5;
  const delay = Math.random() * 5;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  
  particlesContainer.appendChild(particle);
}

// Reveal animation for event cards when scrolling
window.addEventListener('load', function() {
  // Animate timeline events on scroll
  const timelineEvents = document.querySelectorAll('.timeline-event');
  
  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    timelineEvents.forEach(event => {
      const eventTop = event.getBoundingClientRect().top;
      
      if (eventTop < triggerBottom) {
        event.style.opacity = '1';
        event.style.transform = 'translateX(0)';
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check on initial load
});
// about section ai department
document.addEventListener('DOMContentLoaded', function() {
  const aiVisual = document.getElementById('ai-visual');
  const particlesContainer = document.getElementById('particles-container');
  const dataStreamsContainer = document.getElementById('data-streams-container');
  const connectionsContainer = document.getElementById('connections-container');
  const dataNodesContainer = document.getElementById('data-nodes-container');
  const floatingTextContainer = document.getElementById('floating-text-container');
  const interactButton = document.getElementById('interact-button');
  
  // Create floating particles
  for (let i = 0; i < 50; i++) {
      createParticle();
  }
  
  // Create data streams
  for (let i = 0; i < 15; i++) {
      createDataStream();
  }
  
  // Create data nodes
  const nodePositions = [];
  for (let i = 0; i < 20; i++) {
      const position = createDataNode();
      nodePositions.push(position);
  }
  
  // Create connections between nodes
  for (let i = 0; i < 25; i++) {
      connectNodes(nodePositions);
  }
  
  // Create floating text
  const aiTerms = [
      'Machine Learning', 'Neural Networks', 'Deep Learning', 'Computer Vision',
      'Natural Language', 'AI Ethics', 'Big Data', 'Algorithms',
      '01001010', '10101011', 'Reinforcement Learning', 'Predictive Analytics'
  ];
  
  for (let i = 0; i < 8; i++) {
      createFloatingText(aiTerms[i % aiTerms.length]);
  }
  
  // Interactive button
  interactButton.addEventListener('click', function() {
      // Add pulse animation to the brain center
      const brainCenter = document.querySelector('.brain-center');
      brainCenter.style.animation = 'none';
      setTimeout(() => {
          brainCenter.style.animation = 'pulseBrain 1s infinite alternate';
      }, 10);
      
      // Add more data streams
      for (let i = 0; i < 5; i++) {
          createDataStream();
      }
      
      // Add more floating text
      for (let i = 0; i < 3; i++) {
          createFloatingText(aiTerms[Math.floor(Math.random() * aiTerms.length)]);
      }
      
      // Add visual feedback for button click
      this.textContent = "Processing...";
      this.style.backgroundColor = "#8f42e5";
      
      setTimeout(() => {
          this.textContent = "Interact with AI";
          this.style.backgroundColor = "";
      }, 2000);
  });
  
  // Functions to create visual elements
  function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 3 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity;
      
      particlesContainer.appendChild(particle);
  }
  
  function createDataStream() {
      const stream = document.createElement('div');
      stream.className = 'data-stream';
      
      const posX = Math.random() * 90 + 5;
      const opacity = Math.random() * 0.5 + 0.3;
      const duration = Math.random() * 3 + 2;
      
      stream.style.left = `${posX}%`;
      stream.style.opacity = opacity;
      stream.style.animationDuration = `${duration}s`;
      stream.style.animationDelay = `${Math.random() * 2}s`;
      
      dataStreamsContainer.appendChild(stream);
  }
  
  function createDataNode() {
      const node = document.createElement('div');
      node.className = 'data-node';
      
      const posX = Math.random() * 80 + 10;
      const posY = Math.random() * 80 + 10;
      
      node.style.left = `${posX}%`;
      node.style.top = `${posY}%`;
      node.style.animationDelay = `${Math.random() * 3}s`;
      
      dataNodesContainer.appendChild(node);
      
      return { x: posX, y: posY };
  }
  
  function connectNodes(positions) {
      if (positions.length < 2) return;
      
      const startIndex = Math.floor(Math.random() * positions.length);
      let endIndex = Math.floor(Math.random() * positions.length);
      while (endIndex === startIndex) {
          endIndex = Math.floor(Math.random() * positions.length);
      }
      
      const start = positions[startIndex];
      const end = positions[endIndex];
      
      const line = document.createElement('div');
      line.className = 'connection-line';
      
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      line.style.width = `${distance}%`;
      line.style.left = `${start.x}%`;
      line.style.top = `${start.y}%`;
      line.style.transform = `rotate(${angle}deg)`;
      line.style.animationDelay = `${Math.random() * 3}s`;
      
      connectionsContainer.appendChild(line);
  }
  
  function createFloatingText(text) {
      const textElement = document.createElement('div');
      textElement.className = 'floating-text';
      textElement.textContent = text;
      
      const posX = Math.random() * 70 + 15;
      const posY = Math.random() * 70 + 15;
      
      textElement.style.left = `${posX}%`;
      textElement.style.top = `${posY}%`;
      textElement.style.animationDelay = `${Math.random() * 5}s`;
      
      floatingTextContainer.appendChild(textElement);
  }
});
//
window.addEventListener('resize', () => {
  document.body.scrollLeft = 0; // Reset horizontal scroll
});

document.body.style.overflowX = 'hidden'; // Force hide horizontal scroll
