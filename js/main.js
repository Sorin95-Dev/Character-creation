import { initEyesModule } from './eyes.js';
import { initBodyModule } from './body.js';
import { initNavigationModule } from './navigation.js';

document.addEventListener('DOMContentLoaded', function(){
  initEyesModule();
  initBodyModule();
  initNavigationModule();
});
