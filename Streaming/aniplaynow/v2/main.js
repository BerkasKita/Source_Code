function createStream() {
  const boxStream = document.querySelector('.box_stream');
  const listServerContainer = document.querySelector('.list_server');
  const arrrList = document.querySelector('.arrr_list');

  const sub = Array.from(arrrList.querySelectorAll('span[data-type="sub"]'));
  const dub = Array.from(arrrList.querySelectorAll('span[data-type="dub"]'));

  // Choose first stream from sub or dub
  let initialStream = sub.length > 0 ? sub[0] : (dub.length > 0 ? dub[0] : null);

  if (initialStream) {
    // Create streaming iframe
    boxStream.innerHTML = `<iframe src="${initialStream.getAttribute('data-url')}" frameborder="0" allowfullscreen></iframe>`;

    // Create server list
    let subHtml = '';
    let dubHtml = '';

    if (sub.length > 0) {
      subHtml = '<div class="server_sub">';
      sub.forEach(server => {
        subHtml += `<div data-url="${server.getAttribute('data-url')}" class="${server.getAttribute('data-url') === initialStream.getAttribute('data-url') ? 'active' : ''}">${server.textContent}</div>`;
      });
      subHtml += '</div>';
    }

    if (dub.length > 0) {
      dubHtml = '<div class="server_dub">';
      dub.forEach(server => {
        dubHtml += `<div data-url="${server.getAttribute('data-url')}" class="${server.getAttribute('data-url') === initialStream.getAttribute('data-url') ? 'active' : ''}">${server.textContent}</div>`;
      });
      dubHtml += '</div>';
    }

    listServerContainer.innerHTML = subHtml + dubHtml;

    // Add event listeners to spans
    document.querySelectorAll('.server_sub span, .server_dub span').forEach(span => {
      span.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        boxStream.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`;

        // Remove active class from all spans and add to the clicked one
        document.querySelectorAll('.server_sub span, .server_dub span').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
      });
    });
  } else {
    // If both sub and dub are empty
    boxStream.innerHTML = '<span>404</span>';
    listServerContainer.innerHTML = '';
  }
}

// Initialize stream on page load
window.onload = function() {
  createStream();
};
