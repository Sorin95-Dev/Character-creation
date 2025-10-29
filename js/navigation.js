import { changeBodyShape } from './body.js';
import { changeEyeOption } from './eyes.js';

export function selectCurrentOption() {
  const selectedBox = document.querySelector('.option-box.selected');
  if (selectedBox) {
    selectedBox.style.transform = 'scale(0.95)';
    setTimeout(() => {
      selectedBox.style.transform = 'scale(1.05)';
      setTimeout(() => {
        selectedBox.style.transform = 'scale(1)';
      }, 100);
    }, 100);
  }
}

export function continueToNext() {
  const avatar = document.querySelector('.avatar-character');
  if (!avatar) return;
  avatar.style.transition = 'transform 0.3s ease';
  avatar.style.transform = 'scale(0.95)';
  setTimeout(() => {
    avatar.style.transform = 'scale(1)';
  }, 300);
}

function onKeyDownNav(e) {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      changeBodyShape(-1);
      break;
    case 'ArrowDown':
      e.preventDefault();
      changeBodyShape(1);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      changeEyeOption(-1);
      break;
    case 'ArrowRight':
      e.preventDefault();
      changeEyeOption(1);
      break;
    case 'a':
    case 'A':
      e.preventDefault();
      selectCurrentOption();
      break;
    case 'Enter':
      e.preventDefault();
      continueToNext();
      break;
  }
}

export function initNavigationModule() {
  document.addEventListener('keydown', onKeyDownNav);

  document.querySelectorAll('.footer-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === 0) {
        console.log('Navigate mode');
      } else if (index === 1) {
        selectCurrentOption();
      } else if (index === 2) {
        if (confirm('¿Estás seguro de que quieres cerrar el editor?')) {
          console.log('Cerrando editor...');
        }
      }
    });
  });

  const continueBtn = document.querySelector('.continue-btn');
  if (continueBtn) continueBtn.addEventListener('click', continueToNext);

  const avatar = document.querySelector('.avatar-character');
  if (avatar) avatar.style.animation = 'fadeIn 0.5s ease-in';
}
