# Sintaks dasar

## Kode CSS
```css
.box_schedule:root {
  --w-1: 100%;
  --w-2: 50%;
  --w-3: 33.3333333%;
  --w-4: 25%;
  --w-5: 20%;
  --w-6: 16.66666%;
}
.no_data{display:block;text-align:center;font-size:1.5em;font-weight:600;opacity:.5}
.tab-content .tab-pane{display:none}
.tab-content .tab-pane.active{display:block}
.box_schedule{overflow:hidden}
.box_schedule>ul{list-style:none;display:flex;flex-wrap:nowrap!important;overflow-y:hidden;overflow-x:auto;margin-bottom:.5rem;border-bottom:1px solid #484f56}
.box_schedule>ul li{display:block;padding:.5em 1em;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;opacity:.75;cursor:pointer;white-space:nowrap}
.box_schedule>ul li.active{color:#0c70de;opacity:1;font-weight:600;border-bottom:2px solid #0c70de}
.tab-content .tab-pane>a{float:left;width:var(--w-6)}
.box_schedule .tab-content .tab-pane > a .box_artikel{margin:5px}
.box_schedule .tab-content .tab-pane > a .box_artikel .thumb{padding:142% 0 0;position:relative;overflow:hidden;background:#333}
.box_schedule .tab-content .tab-pane > a .box_artikel .thumb img{width:100%;height:100%;object-fit:cover;min-height:120px;top:0;position:absolute;transition:all .15s ease-out}
.box_schedule .tab-content .tab-pane > a .box_artikel .thumb .eps{background-color:#ffc107;position:absolute;z-index:1;bottom:0;left:0;width:100%;padding:.25rem;color:#000;text-transform:uppercase;font-weight:700;text-align:center}
.box_schedule .tab-content .tab-pane > a .box_artikel h3{font-size:15px;margin:.5rem 0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}
@media only screen and (max-width: 900px) {
  .tab-content .tab-pane>a{float:left;width:var(--w-4)}
}
@media only screen and (max-width: 768px) {
  .tab-content .tab-pane>a{float:left;width:var(--w-3)}
}
@media only screen and (max-width: 540px) {
  .tab-content .tab-pane>a{float:left;width:var(--w-2)}
}
```

## Kode HTML
```html
<div class="box_schedule">
  Loading...
</div>
```
## Kode Javascript
```javascript
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
    cp_schedule.xhr(`/feeds/posts/default${label_name == false ? '' : `/-/${label_name}`}?alt=json-in-script&max-results=150`, get_cp_schedule);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  run_cp_schedule();
});
```
