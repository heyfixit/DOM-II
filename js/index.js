// Your code goes here

function randomRGB() {
  const vals = [];
  for(i = 0; i < 3; i++) {
    vals.push(Math.floor(Math.random() * 255));
  }
  return `rgb(${vals.join(",")})`;
}

window.onload = () => {
  const body = document.getElementsByTagName("body")[0];
  body.style.position = "relative";
  // const busImg = document.querySelector(".intro img");

  // mousing over nav links triggers dropElement
  Array.from(document.querySelectorAll("nav > *")).forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      e.preventDefault();
      dropElement(e.currentTarget);
    });
  });

  // any keydown event randomizes body background
  body.addEventListener('keydown', () => {
    body.style.backgroundColor = randomRGB();
  });

  // img events
  Array.from(document.getElementsByTagName("img")).forEach(el => {
    // wheel rotates images
    el.addEventListener("wheel", () => {
      el.style.transition = "all 0.5s";
      setTimeout(() => el.style.transform = `rotate(${Math.floor(Math.random() * 1080)}deg)`);
    });

    // double click restores them to 0
    el.addEventListener("dblclick", () => {
      setTimeout(() => el.style.transform = "rotate(0deg)");
    });
  });


  // console.log(busImg);
  // busImg.style.position = "absolute"

  function dropElement(element) {
    const newElement = element.cloneNode(true);
    const rect = element.getBoundingClientRect();
    body.appendChild(newElement);
    // newElement.classList = element.classList;
    newElement.style.position = "absolute";
    newElement.style.zIndex = 999;
    newElement.style.fontSize = "1.6rem";
    newElement.style.color = "black";
    newElement.style.textDecoration = "none";
    newElement.style.top = `${rect.top + window.scrollY}px`;
    newElement.style.left = `${rect.left + window.scrollX}px`;
    newElement.style.width = `${rect.right - rect.left}px`;
    newElement.style.transition = "all 0.5s";
    newElement.style.animationTimingFunction = "ease-in";
    setTimeout(() => {
      newElement.style.opacity = 0;
      newElement.style.transform = `translateY(${(rect.bottom - rect.top + 250)}px`
    });
    setTimeout(() => newElement.parentNode.removeChild(newElement), 500);
  }
};
