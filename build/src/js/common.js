import * as materialLibrary from './materialize/bin/materialize';

document.addEventListener('DOMContentLoaded', function() {
  
  const carousel1 = document.querySelectorAll('.carousel_1');
  const carouse1lInstance = M.Carousel.init(carousel1, {
    fullWidth: true,
    indicators: true
  });

  const carousel2 = document.querySelectorAll('.carousel_2');
  const carouse2lInstance = M.Carousel.init(carousel2, {
    fullWidth: true,
    numVisible: 3
  });

  const collapsable = document.querySelectorAll('.collapsible');
  const collapsableInstance = M.Collapsible.init(collapsable, {});

  const tabs = document.querySelectorAll('.tabs');
  const tabsInstance = M.Tabs.init(tabs, {
    // swipeable: true
  });

  const dropdown = document.querySelectorAll('.dropdown-trigger');
  const dropdownInstance = M.Dropdown.init(dropdown, {});

  const select = document.querySelectorAll('select');
  const selectInstance = M.FormSelect.init(select, {});

});