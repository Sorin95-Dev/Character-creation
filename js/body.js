import { avatarState } from './state.js';

export function updateBodyShape(shapeIndex) {
  const avatar = document.querySelector('.avatar-character');
  if (!avatar) return;

  switch (shapeIndex) {
    case 0:
      avatar.style.width = '250px';
      avatar.style.height = '380px';
      avatar.style.borderRadius = '50% 50% 48% 48%';
      break;
    case 1:
      avatar.style.width = '300px';
      avatar.style.height = '350px';
      avatar.style.borderRadius = '50% 50% 45% 45%';
      break;
    case 2:
      avatar.style.width = '340px';
      avatar.style.height = '330px';
      avatar.style.borderRadius = '50% 50% 42% 42%';
      break;
  }
}

export function changeBodyShape(direction) {
  const bodyOptions = document.querySelectorAll('.body-option');
  const currentIndex = avatarState.selectedBody;
  let newIndex = currentIndex + direction;

  if (newIndex < 0) newIndex = 0;
  if (newIndex > bodyOptions.length - 1) newIndex = bodyOptions.length - 1;

  if (bodyOptions[currentIndex]) bodyOptions[currentIndex].classList.remove('selected');
  if (bodyOptions[newIndex]) bodyOptions[newIndex].classList.add('selected');
  avatarState.selectedBody = newIndex;
  updateBodyShape(newIndex);
}

export function initBodyModule() {
  const bodyOptions = document.querySelectorAll('.body-option');
  bodyOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
      bodyOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      avatarState.selectedBody = index;
      updateBodyShape(index);
    });
  });

  updateBodyShape(avatarState.selectedBody);
}
