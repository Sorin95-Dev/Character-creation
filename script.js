const avatarState = {
    currentCategory: 0,
    categories: ['eyes'],
    selectedEye: 0,
    selectedBody: 1,
    eyeStyles: [
        { type: 'normal', pupils: true },
        { type: 'small', pupils: true },
        { type: 'single', pupils: true },
        { type: 'lashes', pupils: false },

    ]
};

const optionBoxes = document.querySelectorAll('.option-box');
optionBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        optionBoxes.forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        avatarState.selectedEye = index;
        updateAvatarEyes(index);
    });
});

const bodyOptions = document.querySelectorAll('.body-option');
bodyOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
        bodyOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        avatarState.selectedBody = index;
        updateBodyShape(index);
    });
});

function updateAvatarEyes(styleIndex) {
    const avatarEyesContainer = document.querySelector('.avatar-eyes');
    const style = avatarState.eyeStyles[styleIndex];

    if (!style) return;

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

function updateBodyShape(shapeIndex) {
    const avatar = document.querySelector('.avatar-character');

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

document.addEventListener('keydown', (e) => {
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
});

function changeBodyShape(direction) {
    const currentIndex = avatarState.selectedBody;
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = 0;
    if (newIndex > bodyOptions.length - 1) newIndex = bodyOptions.length - 1;

    bodyOptions[currentIndex].classList.remove('selected');
    bodyOptions[newIndex].classList.add('selected');
    avatarState.selectedBody = newIndex;
    updateBodyShape(newIndex);
}

function changeEyeOption(direction) {
    const currentIndex = avatarState.selectedEye;
    const filledOptions = Array.from(optionBoxes).filter((_, i) => i < 6);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = 0;
    if (newIndex > filledOptions.length - 1) newIndex = filledOptions.length - 1;

    optionBoxes[currentIndex].classList.remove('selected');
    optionBoxes[newIndex].classList.add('selected');
    avatarState.selectedEye = newIndex;
    updateAvatarEyes(newIndex);
}

function selectCurrentOption() {
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

function continueToNext() {
    const avatar = document.querySelector('.avatar-character');
    if (!avatar) return;
    avatar.style.transition = 'transform 0.3s ease';
    avatar.style.transform = 'scale(0.95)';
    setTimeout(() => {
        avatar.style.transform = 'scale(1)';
    }, 300);
}

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

document.querySelector('.continue-btn').addEventListener('click', continueToNext);

window.addEventListener('load', () => {
    const avatar = document.querySelector('.avatar-character');
    avatar.style.animation = 'fadeIn 0.5s ease-in';
});

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