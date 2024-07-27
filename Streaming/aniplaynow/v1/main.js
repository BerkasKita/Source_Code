// Function to create streaming content
function createStream(stream) {
  const boxStream = document.querySelector('.box_stream');
  const listServer = document.querySelector('.list_server');

  const sub = stream[0].server.sub;
  const dub = stream[0].server.dub;

  // Choose first stream from sub or dub
  let initialStream = sub.length > 0 ? sub[0] : (dub.length > 0 ? dub[0] : null);

  if (initialStream) {
    // Create streaming iframe
    boxStream.innerHTML = `<iframe src="${initialStream.url}" frameborder="0" allowfullscreen></iframe>`;

    // Create server list
    let subHtml = '';
    let dubHtml = '';

    if (sub.length > 0) {
      subHtml = '<div class="server_sub">';
      sub.forEach(server => {
        subHtml += `<span data-url="${server.url}">${server.name}</span>`;
      });
      subHtml += '</div>';
    }

    if (dub.length > 0) {
      dubHtml = '<div class="server_dub">';
      dub.forEach(server => {
        dubHtml += `<span data-url="${server.url}">${server.name}</span>`;
      });
      dubHtml += '</div>';
    }

    listServer.innerHTML = subHtml + dubHtml;

    // Add event listeners to spans
    document.querySelectorAll('.server_sub span, .server_dub span').forEach(span => {
      span.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        boxStream.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`;
      });
    });
  } else {
    // If both sub and dub are empty
    boxStream.innerHTML = '<span>404</span>';
    listServer.innerHTML = '';
  }
}

// Initialize stream on page load
window.onload = function() {
  createStream(stream);
};
