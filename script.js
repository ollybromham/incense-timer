const incense = document.querySelector('.incense');
const stick = document.querySelector('.stick');
const burn = document.querySelector('.burn');
const smoke = document.querySelector('.smoke');
const slider = document.querySelector('.slider');
const text = document.querySelector('.text');
const timer = document.querySelector('.time');

let burnt = 1;
let burning = false;
let length = window.innerHeight >= 700 ? 550 : 450
let bpm = 8.5
let last = length
let ash = 6
let finish = false
let time = 60
let selecting = true


function update(ignite, burntime) {
  let now = new Date()
  nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())
  timesince = Math.round((nowUTC - ignite)/1000)
  if (length * ((burntime-timesince) / (burntime)) <= 5) { // end
    incense.style.height = "5px"
    smoke.style.opacity = 0
    burn.classList.add('end')
    burn.style.opacity = 1
    burn.style.height = `6px`
    burn.style.marginTop = `0px`
    finish = true
  } else { // Burning...
    let current = length * ((burntime-timesince) / (burntime))
    incense.style.height = `${current}px`
    smoke.style.bottom = `${current}px`
    // Ash
    if (Math.floor(last) > Math.floor(current)) { // only if incense decreases by 1px
      if (Math.floor(Math.random() * 10) === 1) {
        ash = 6
      } else {
        ash += 1
      }
    }
    last = current
    burn.style.height = `${ash}px`
    burn.style.marginTop = `${-(ash-6)}px`
    burn.style.opacity = 1
    smoke.style.opacity = 1
  }
}


slider.oninput = function() {
  if (selecting) {
    timer.innerHTML = slider.value
    time = timer.innerHTML
    incense.style.height = ''+(time*bpm)+'px'
    stick.style.height = `${(45+(time*bpm))}px`
    length = (time*bpm)
  }
};

incense.addEventListener('click', () => {
  selecting = false
  burning = true

  text.style.transition = '1s ease'
  text.style.opacity = 0
  burn.style.opacity = 1
  smoke.style.opacity = 1

  let ignite = new Date()
  let burntime = (slider.value * 60)

  const int = setInterval(() => {
    update(ignite, burntime)
    if (finish) clearInterval(int)
  }, 1000)
})

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main').style.opacity = 1
  bpm = length / 60;

  incense.style.height = `${length}px`
  stick.style.height = `${(45+length)}px`
  slider.style.width = `${(35+length)}px`
  slider.style.bottom = `${(length)/2}px`
})