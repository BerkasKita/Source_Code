let days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

let cp_schedule = new BloggerScript({
  noImage: "https://1.bp.blogspot.com/-XSp30PahyTM/YK37Rq_-M7I/AAAAAAAABCc/01K0sUhw-2YI7vr48wqMIAVoMLDEUdK2gCLcBGAsYHQ/s2048/No%2BImage%2BBerkas%2BKita.jpg",
  sizeImage: 's320'
});

const get_cp_schedule = (e) => {
  let get_location = document.querySelector('.box_schedule');
  let entry = cp_schedule.getFeed(e);

  let groupedEntries = {};
  days.forEach(day => {
    groupedEntries[day] = entry.filter(entry => entry.label.includes(day));
  });
  console.log(groupedEntries);
  let ulContent = '';
  let tabContent = '';

  days.forEach((day, index) => {
    ulContent += `<li class="nav-item" data-post="${index + 1}">${day}</li>`;

    let entriesHtml = '';
    groupedEntries[day].forEach(item => {
      let eps = item.label.find(i => ["Episode","Eps.","Ep"].some(s => i.includes(s)));
      entriesHtml += `
        <a href="${item.link}">
          <div class="box_artikel">
            <div class="thumb">
              <img src="${item.image}" alt="${item.title}">
              ${eps?`<div class="eps"><span>${eps}</span></div>`:''}
            </div>
            <h3>${item.title}</h3>
          </div>
        </a>`;
    });
    if (entriesHtml === '') {
      entriesHtml = `<span class="no_data">No Post...</span>`;
    }
    tabContent += `<div class="tab-pane" data-post="${index + 1}">${entriesHtml}</div>`;
  });
  if (get_location) {
    get_location.innerHTML = `<ul>${ulContent}</ul><div class="tab-content">${tabContent}</div>`;

    // Add event listener for tab switching
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function() {
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.querySelector('.tab-pane[data-post="' + this.getAttribute('data-post') + '"]').classList.add('active');

        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Set the active tab based on the current day
    let today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let dayIndex = today === 0 ? 6 : today - 1; // Adjust the index to match the days array (0 = Senin, ..., 6 = Minggu)
    console.log(today);
    
    document.querySelectorAll('.nav-item')[dayIndex].classList.add('active');
    document.querySelectorAll('.tab-pane')[dayIndex].classList.add('active');
  }
};

const run_cp_schedule = () => {
  let get_location = document.querySelector('.box_schedule');
  if (get_location) {
    let label_name = get_location.dataset.label || false;
    cp_schedule.xhr2(`https://onistream-jgggg.blogspot.com/feeds/posts/default${label_name == false ? '' : `/-/${label_name}`}?alt=json-in-script&max-results=150`, get_cp_schedule);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  run_cp_schedule();
});
