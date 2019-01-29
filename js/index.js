// Your code goes here

function randomRGB() {
  const vals = [];
  for(i = 0; i < 3; i++) {
    vals.push(Math.floor(Math.random() * 255));
  }
  return `rgb(${vals.join(",")})`;
}

// load event listener
window.onload = () => {
  const body = document.getElementsByTagName("body")[0];
  const containers = document.querySelectorAll(".container");
  body.style.position = "relative";
  // const busImg = document.querySelector(".intro img");

  // mousing over nav links triggers dropElement
  Array.from(document.querySelectorAll("nav > *")).forEach((el) => {
    el.addEventListener("click", (e) => e.preventDefault());
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

  // resize event
  window.addEventListener("resize", () => {
    const interval = setInterval(() => {
      containers.forEach(c => c.style.color = randomRGB());
      // container.style.transform = `translateX(${Math.random() > 0.5 ? -10 : 10}px)`;
    }, 100);
    setTimeout(() => clearInterval(interval), 500);
  });

  // mouseenter
  Array.from(document.getElementsByTagName("p")).forEach(p => {
    p.addEventListener("mouseenter", () => {
      p.style.fontWeight = "bold"
    });
  });

  // mouseleave
  Array.from(document.getElementsByTagName("p")).forEach(p => {
    p.addEventListener("mouseleave", () => {
      p.style.fontWeight = "normal";
    });
  });

  // click
  document.getElementsByClassName("btn")[0].addEventListener("click", () => {
    const time = Math.random() * 1000 + 500;
    body.style.transition = `all ${time / 1000}s`;
    setTimeout(() => body.style.transform = `scale(${Math.random() * 0.5})`);
    setTimeout(() => body.style.transform = "scale(1)", time);

  });

  // drag and drop
  // // set p elements to draggable
  Array.from(document.getElementsByTagName("p")).forEach(p => {
    p.setAttribute("draggable", true);
  });

  // IIFE, not sure if this makes sense
  (function() {
    let dragged;
    document.addEventListener("drag", (e) => {
      dragged = e.srcElement;
      e.srcElement.style.backgroundColor = "red";
    });

    document.addEventListener("dragover", e => e.preventDefault());

    //drop event
    document.addEventListener("drop", (e) => {
      console.log(e);
      e.preventDefault();
      if(dragged) {
        dragged.style.backgroundColor = "";
      }
      e.target.style.backgroundColor = "blue";
    });

    // prevent propagation on first paragraph
    document.querySelector("p").addEventListener("drag", (e) => {
      e.stopPropagation();
    });
  })();

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
