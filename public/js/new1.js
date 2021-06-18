document.addEventListener('click', function (e) {
    if (e.target.classList.contains("increase")) {
      ++e.target.parentElement.querySelector("input").value;
    } else if (e.target.classList.contains("decrease") && e.target.parentElement.querySelector("input").value > 0) {
      --e.target.parentElement.querySelector("input").value;
    }
  })