jQuery(window).load(function() {
  let step = 1;
  let data = Array();
  data['error'] = 0;
  setActive(step);
  const options = document.querySelectorAll('.form-step .form-options a');
  options.forEach((e) => {
    e.addEventListener("click", (i) => {
      i.preventDefault();
      data = saveData(data, step, i);
      if (data['error'] == 0) {
        step++;
        setActive(step);
      }
    });
  });
  const sliders = document.querySelectorAll("input[id^='slider-']");
  sliders.forEach((e) => {
    e.oninput = function() {
      sliderValue(this.id, this);
    }
  })
});

function sliderValue(sliderId, obj) {
  let y1, y2, x1=1, x2=100, m;
  switch (sliderId) {
    case "slider-5":
      y1 = 50000;
      y2 = 2000000;
      break;
    case "slider-6":
      y1 = 5;
      y2 = 90;
      break;
    case "slider-7":
      y1 = 80000;
      y2 = 500000;
      break;
  }
  m = ((y1-y2) / (x1-x2));
  let val  = obj.value;
  let value = Math.ceil((m * val)-m + y1);
  document.querySelector(`#${sliderId}-rta`).innerHTML = value;
}

function setActive(step) {
  removeActive();
  const active_item = document.querySelectorAll(`.step-${step}`);
  active_item.forEach((e) => {
    e.classList.add('active');
  });
}

function removeActive() {
  const form_step = document.querySelectorAll('.form-step');
  form_step.forEach((e) => {
    e.classList.remove('active');
  });
}

function saveData(data, step, obj) {
  switch(step) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 8:
    case 9:
      data[step-1] = obj.target.innerHTML;
      break;
    case 5:
    case 6:
    case 7:
      data[step-1] = document.querySelector(`#slider-${step}-rta`).innerHTML;
      break;
    case 10:
      let name = document.getElementById('name');
      let tel = document.getElementById('telefono');
      let email = document.getElementById('email');
      name.classList.remove('error');
      tel.classList.remove('error');
      email.classList.remove('error');
      data['error'] = 0;
      if (name.value == '') {
        data['error'] = 1;
        name.classList.add('error');
      }
      if (email.value == '') {
        data['error'] = 1;
        email.classList.add('error');
      }
      if (tel.value == '') {
        data['error'] = 1;
        tel.classList.add('error');
      }
      if (data['error'] == 0) {
        data['name'] = document.getElementById('name').value;
        data['telefono'] = document.getElementById('telefono').value;
        data['email'] = document.getElementById('email').value;
        let valid = (data[7] == 'Pobre (500 a 639)') ? 0 : 1;
        let rta = document.querySelector((valid == 1) ? '.good' : '.bad' );
        let _name = (rta.innerHTML).replace('__name__', data['name']);
        rta.innerHTML = _name;
        rta.classList.add('active_rta');
        document.querySelector('.icon-slide-form').classList.add('hide');
        saveDataForm(data);
      }
      break;
  }
  return data;
}

function saveDataForm(data) {
  let _datos = Object.assign({}, data);

  fetch('/wp-json/data_form/v1/dataform', {
    method: "POST",
    body: JSON.stringify(_datos),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(json => (e)=>{
  })
  .catch(err => console.log(err));
}