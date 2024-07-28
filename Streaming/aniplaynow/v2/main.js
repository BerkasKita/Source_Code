function createStream() {
  const boxStream = document.querySelector('.box_stream');
  const listServer = document.querySelector('.arrr_list');

  const sub = Array.from(listServer.querySelectorAll('span[data-type="sub"]'));
  const dub = Array.from(listServer.querySelectorAll('span[data-type="dub"]'));

  // Choose first stream from sub or dub
  let initialStream = sub.length > 0 ? sub[0] : (dub.length > 0 ? dub[0] : null);

  if (initialStream) {
    // Create streaming iframe
    boxStream.innerHTML = `<iframe src="${initialStream.getAttribute('data-url')}" frameborder="0" allowfullscreen></iframe>`;

    // Add class 'active' to initial stream
    initialStream.classList.add('active');

    // Add event listeners to spans
    listServer.querySelectorAll('span').forEach(span => {
      span.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        boxStream.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`;

        // Remove active class from all spans and add to the clicked one
        listServer.querySelectorAll('span').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
      });
    });
  } else {
    // If both sub and dub are empty
    boxStream.innerHTML = '<span>404</span>';
  }
}

// Initialize stream on page load
window.onload = function() {
  createStream();
};
