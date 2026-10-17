/*
 * The ONE place to change the app's name and icon.
 *
 * Every page loads this file. It replaces the text of every element marked
 * data-app-name, the src of every image marked data-app-icon, the favicon,
 * and the app name inside each page <title>.
 *
 * The HTML files also contain the default name as plain text, so the pages
 * still read correctly with JavaScript off. When the name is final, also run
 * the one-line command in README.md to bake it into the HTML.
 */
var SITE = {
  appName: 'Balio',
  icon: 'icon.png'
};

(function () {
  var DEFAULT_NAME = 'Balio';
  var name = SITE.appName;
  var i, els;

  els = document.querySelectorAll('[data-app-name]');
  for (i = 0; i < els.length; i++) els[i].textContent = name;

  els = document.querySelectorAll('[data-app-icon]');
  for (i = 0; i < els.length; i++) {
    els[i].src = SITE.icon;
    if (els[i].alt) els[i].alt = name + ' app icon';
  }

  els = document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]');
  for (i = 0; i < els.length; i++) els[i].href = SITE.icon;

  if (name !== DEFAULT_NAME) document.title = document.title.split(DEFAULT_NAME).join(name);
})();
