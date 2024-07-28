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
      subHtml = `<div class="server_sub">
        <span>
          <svg viewBox="0 0 32 32" class="w-5 h-5" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z" fill="currentColor"></path></svg>
          SUB: 
        </span>`;
      sub.forEach(server => {
        subHtml += `<div class="${server.url === initialStream.url ? 'active' : ''}" data-url="${server.url}">${server.name}</div>`;
      });
      subHtml += '</div>';
    }

    if (dub.length > 0) {
      dubHtml = `<div class="server_dub">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5z"></path></svg>
          DUB: 
        </span>`;
      dub.forEach(server => {
        dubHtml += `<div class="${server.url === initialStream.url ? 'active' : ''}" data-url="${server.url}">${server.name}</div>`;
      });
      dubHtml += '</div>';
    }

    listServer.innerHTML = subHtml + dubHtml;

    // Add event listeners to spans
    document.querySelectorAll('.server_sub>div, .server_dub>div').forEach(span => {
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
