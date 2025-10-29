import { avatarState } from './state.js';

export function updateAvatarEyes(styleIndex) {
  const avatarEyesContainer = document.querySelector('.avatar-eyes');
  const style = avatarState.eyeStyles[styleIndex];
  if (!style || !avatarEyesContainer) return;

  switch (styleIndex) {
    case 0:
      avatarEyesContainer.innerHTML = `
        <div class="avatar-eye">
          <div class="avatar-pupil">
            <div class="avatar-highlight"></div>
          </div>
        </div>
        <div class="avatar-eye">
          <div class="avatar-pupil">
            <div class="avatar-highlight"></div>
          </div>
        </div>
      `;
      break;
    case 1:
      avatarEyesContainer.innerHTML = `
        <div class="avatar-eye" style="width: 25px; height: 25px;">
          <div class="avatar-pupil" style="width: 15px; height: 15px;">
            <div class="avatar-highlight"></div>
          </div>
        </div>
        <div class="avatar-eye" style="width: 25px; height: 25px;">
          <div class="avatar-pupil" style="width: 15px; height: 15px;">
            <div class="avatar-highlight"></div>
          </div>
        </div>
      `;
      break;
    case 2:
      avatarEyesContainer.innerHTML = `
        <div class="avatar-eye" style="width: 60px; height: 60px; background: #7ab87a;">
          <div class="avatar-pupil" style="width: 35px; height: 35px;">
            <div class="avatar-highlight"></div>
          </div>
        </div>
      `;
      avatarEyesContainer.style.gap = '0';
      break;
    case 3:
      avatarEyesContainer.innerHTML = `
        <div style="position: relative;">
          <div class="avatar-eye">
            <div class="avatar-pupil">
              <div class="avatar-highlight"></div>
            </div>
          </div>
          <div style="width: 30px; height: 3px; background: #000; position: absolute; top: -8px; left: 0; border-radius: 10px; transform: rotate(-20deg);"></div>
          <div style="width: 30px; height: 3px; background: #000; position: absolute; top: -5px; right: -5px; border-radius: 10px; transform: rotate(20deg);"></div>
        </div>
        <div style="position: relative;">
          <div class="avatar-eye">
            <div class="avatar-pupil">
              <div class="avatar-highlight"></div>
            </div>
          </div>
          <div style="width: 30px; height: 3px; background: #000; position: absolute; top: -8px; left: 0; border-radius: 10px; transform: rotate(-20deg);"></div>
          <div style="width: 30px; height: 3px; background: #000; position: absolute; top: -5px; right: -5px; border-radius: 10px; transform: rotate(20deg);"></div>
        </div>
      `;
      avatarEyesContainer.style.gap = '40px';
      break;
  }
}

export function changeEyeOption(direction) {
  const optionBoxes = document.querySelectorAll('.option-box');
  const currentIndex = avatarState.selectedEye;
  const filledOptions = Array.from(optionBoxes).filter((_, i) => i < 6);
  let newIndex = currentIndex + direction;

  if (newIndex < 0) newIndex = 0;
  if (newIndex > filledOptions.length - 1) newIndex = filledOptions.length - 1;

  if (optionBoxes[currentIndex]) optionBoxes[currentIndex].classList.remove('selected');
  if (optionBoxes[newIndex]) optionBoxes[newIndex].classList.add('selected');
  avatarState.selectedEye = newIndex;
  updateAvatarEyes(newIndex);
}

export function initEyesModule() {
  const optionBoxes = document.querySelectorAll('.option-box');
  optionBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      optionBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      avatarState.selectedEye = index;
      updateAvatarEyes(index);
    });
  });

  updateAvatarEyes(avatarState.selectedEye);

  setInterval(() => {
    const pupils = document.querySelectorAll('.avatar-pupil');
    pupils.forEach(pupil => {
      pupil.style.transition = 'transform 0.1s ease';
      pupil.style.transform = 'translate(-50%, -50%) scaleY(0.1)';
      setTimeout(() => {
        pupil.style.transform = 'translate(-50%, -50%) scaleY(1)';
      }, 100);
    });
  }, 4000);

  document.addEventListener('mousemove', (e) => {
    const pupils = document.querySelectorAll('.avatar-pupil');
    const eyes = document.querySelectorAll('.avatar-eye');

    eyes.forEach((eye, index) => {
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(rect.width * 0.2, 8);

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      if (pupils[index]) {
        pupils[index].style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
      }
    });
  });
}
