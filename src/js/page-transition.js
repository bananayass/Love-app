(function () {
  document.body.classList.add('page-enter');

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;

    e.preventDefault();

    if (document.body.classList.contains('page-exit')) return;
    document.body.classList.add('page-exit');

    setTimeout(function () {
      window.location.href = href;
    }, 300);
  });

  window.navigateTo = function (url) {
    if (document.body.classList.contains('page-exit')) return;
    document.body.classList.add('page-exit');
    setTimeout(function () {
      window.location.href = url;
    }, 300);
  };
})();
