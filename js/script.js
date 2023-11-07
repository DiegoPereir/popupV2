document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener('wheel', event => {
    event.preventDefault();
    window.scrollBy({
      top: event.deltaY < 0 ? -800 : 1000,
      left: 0,
      behavior: 'smooth'
    });
  }, { passive: false });
});
//menu hamburguer mobile

// Atualize o script existente com este código

document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-links'); // Seleciona todos os links do menu

  mobileMenu.addEventListener('click', function () {
    mobileMenu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
  });

  // Adiciona evento click para cada link no menu
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Verifica se o menu está ativo antes de tentar fechar
      if (menuLinks.classList.contains('active')) {
        mobileMenu.classList.remove('is-active');
        menuLinks.classList.remove('active');
      }
    });
  });
});







document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os itens da navegação
  const navItems = document.querySelectorAll('nav a'); // Supondo que seus links estejam dentro de uma <nav> e sejam <a>

  // Função para remover a classe ativa de todos os itens e adicioná-la ao item clicado
  function setActiveItem(clickedItem) {
    navItems.forEach(item => {
      item.classList.remove('active-nav-item');
    });
    clickedItem.classList.add('active-nav-item');
  }

  // Adiciona o event listener para cada item da navegação
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      setActiveItem(e.currentTarget);
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section'); // Assumindo que suas seções são <section>
  const navLinks = document.querySelectorAll('nav a');

  let currentSectionIndex = -1;

  // Função para atualizar o link ativo
  function updateActiveNavLink() {
    sections.forEach((section, index) => {
      const top = section.getBoundingClientRect().top;
      const bottom = section.getBoundingClientRect().bottom;

      if (top <= window.innerHeight * 0.3 && bottom >= window.innerHeight * 0.3) {
        // Se a seção estiver no meio da tela
        if (currentSectionIndex !== index) {
          // Se a seção atual for diferente da última, atualize os links
          navLinks.forEach((link) => link.classList.remove('active-nav-item'));
          const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active-nav-item');
          }
          currentSectionIndex = index;
        }
      }
    });
  }

  // Ouvinte de evento de scroll para atualizar o link ativo
  window.addEventListener('scroll', updateActiveNavLink);

  // Lógica para rolagem suave para seções a partir de cliques na navegação
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Rolagem suave para a seção
        targetSection.scrollIntoView({ behavior: 'smooth' });
        // Atualize os links ativos após a rolagem
        navLinks.forEach(link => link.classList.remove('active-nav-item'));
        this.classList.add('active-nav-item');
      }
    });
  });
});




document.addEventListener("DOMContentLoaded", function () {
  let hasAnimated = false;

  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateWhenInView() {
    if (!hasAnimated && isElementInViewport(document.getElementById("NT"))) {
      hasAnimated = true; // Marca a animação como iniciada para que não execute novamente
      startAnimation(); // Inicia a animação
    }
  }

  function startAnimation() {
    function animateValue(id, start, end, duration, callback) {
      let range = end - start;
      let current = start;
      let increment = end > start ? (id === "ITP" ? 111 : 1) : -1;  // Ajuste aqui para o ITP
      let stepTime = Math.abs(Math.floor(duration / range * increment)); // Ajuste na duração do step
      let obj = document.getElementById(id);

      let isExpo = obj.textContent.includes("R$");
      let prefix = isExpo ? "R$" : "";

      obj.classList.add('animating'); // Adiciona a classe animating durante a animação
      let timer = setInterval(() => {
        current += increment;
        if (id === "ITP" && current >= end) {  // Verifica se ultrapassou o valor final
          current = end;
        }
        if (isExpo) {
          obj.innerHTML = `<span class="expo">${prefix}</span>${current}`;
        } else {
          obj.textContent = current;
        }
        if (current == end) {
          clearInterval(timer);
          obj.classList.remove('animating'); // Remove a classe animating após a animação
          if (callback) callback(); // Chama a próxima animação se houver um callback definido
        }
      }, stepTime);
    }

    // Encadeia as chamadas de animação
    animateValue("NT", 0, 25, 1000, function () {
      animateValue("CP", 0, 100, 1500, function () {
        animateValue("ITP", 0, 10000, 2000);
      });
    });
  }

  // Adiciona o ouvinte de evento de scroll
  window.addEventListener('scroll', animateWhenInView);
});







document.addEventListener('DOMContentLoaded', function () {
  const slidesContainer = document.querySelector('#feedbacks .slides-container');
  const slides = document.querySelectorAll('#feedbacks .slide');
  let currentSlide = 0;

  function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width; // Largura exata, incluindo escala de zoom
    slidesContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
  }

  document.querySelector('#feedbacks .left-arrow').addEventListener('click', function () {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    updateSlidePosition();
  });

  document.querySelector('#feedbacks .right-arrow').addEventListener('click', function () {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    updateSlidePosition();
  });

  // Atualiza a posição inicial do slide após todas as imagens serem carregadas
  window.addEventListener('load', updateSlidePosition);
});





document.addEventListener("DOMContentLoaded", function() {
  var section = document.querySelector("#solucoes");

  var options = {
    root: null, // viewport
    threshold: 0.5 // 50% da seção deve estar visível
  };

  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      // Quando a seção está visível
      if (entry.isIntersecting) {
        entry.target.querySelector("h1").classList.add("animate-in-h1");
        entry.target.querySelector("p").classList.add("animate-in-p");
        observer.unobserve(entry.target); // Pare de observar após a animação
      }
    });
  }, options);

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function() {
  var section = document.querySelector("#cases");
  var cases = document.querySelectorAll(".cases");
  var lists = document.querySelectorAll(".collum-desc ul");

  var options = {
    root: null, // viewport
    threshold: 0.5 // 50% da seção deve estar visível
  };

  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animação para os elementos .cases
        cases.forEach(function(element, index) {
          setTimeout(function() {
            element.classList.add("animate-in");
          }, index * 500); // Atrasa a animação para cada .cases
        });

        // Animação para os elementos ul
        lists.forEach(function(element, index) {
          setTimeout(function() {
            element.classList.add("animate-in");
          }, index * 500); // Atrasa a animação para cada ul
        });

        observer.unobserve(entry.target); // Pare de observar após a animação
      }
    });
  }, options);

  observer.observe(section);
});




// document.addEventListener('DOMContentLoaded', function() {
//   const accessToken = 'SEU_ACCESS_TOKEN'; // Você deve obter um token de acesso válido
//   const userId = 'USER_ID'; // O ID do usuário do Instagram cujas postagens você deseja mostrar
//   const feedContainer = document.querySelector('.instagram-feed');

//   fetch(`https://graph.instagram.com/v11.0/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}&limit=8`)
//     .then(response => response.json())
//     .then(data => {
//       data.data.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('instagram-post');
//         postElement.innerHTML = `
//           <a href="${post.permalink}" target="_blank">
//             <img src="${post.media_url}" alt="${post.caption}" />
//           </a>
//         `;
//         feedContainer.appendChild(postElement);
//       });
//     })
//     .catch(error => {
//       console.error('Erro ao buscar postagens do Instagram:', error);
//     });
// });
