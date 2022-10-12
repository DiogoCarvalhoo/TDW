function main() {
    const h1 = document.getElementById("contentDiv");

    for (let i = 1; i <= 100; i++) {
      if (i % 2 == 0)
        h1.innerHTML += "<h1 class=\"text-danger\">Hello World " + i + " </h1>"
      else
        h1.innerHTML += "<h1 class=\"text-success\">Hello World " + i + " </h1>"
    }

  };