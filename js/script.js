document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener('wheel', event => {
    event.preventDefault(); // Previne o comportamento padrão de rolagem

    // Calcula o valor de rolagem desejado
    const scrollAmount = event.deltaY < 0 ? -window.innerHeight / 2 : window.innerHeight / 2;

    window.scrollBy({
      top: scrollAmount,
      left: 0,
      behavior: 'smooth'
    });
  }, { passive: false });
});



//menu hamburguer mobile----------------------------------------------------------------------------------------------------------------
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

// efeito active navvbar dependendo da sessao---------------------------------------------------------------------------------------------------------
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
  
          // Aqui, nós ajustamos a lógica para verificar dois IDs diferentes
          let activeLink;
          if (section.id === "cases" || section.id === "casesCards") {
            // Se qualquer um dos IDs corresponder, selecione o link com o href para '#case'
            activeLink = document.querySelector('nav a[href="#cases"]');
          } else {
            // Caso contrário, selecione o link como normalmente
            activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
          }
  
          // Se um link ativo for encontrado, adicione a classe 'active-nav-item'
          if (activeLink) {
            activeLink.classList.add('active-nav-item');
          }
          currentSectionIndex = index;
        }
      }
    });
  }
  
  // Continua a adicionar o ouvinte de evento de scroll
  window.addEventListener('scroll', updateActiveNavLink);
  

  // Lógica para rolagem suave para seções a partir de cliques na navegação-----------------------------------------------------------------------------
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



// Animaçao Soluções --------------------------------------------------------------------------------------------------------------------

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






// Carousel dos feedbacks ------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const slidesContainer = document.querySelector('#feedbacks .slides-container');
  const slides = document.querySelectorAll('#feedbacks .slide');
  const leftArrow = document.querySelector('#feedbacks .left-arrow');
  const rightArrow = document.querySelector('#feedbacks .right-arrow');
  let currentSlide = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;
  const totalSlides = slides.length;

  function updateSlidePosition() {
    const containerWidth = slidesContainer.getBoundingClientRect().width;
    const maxOffset = (totalSlides - 1) * slideWidth;
    const offset = Math.min(maxOffset, containerWidth / 2 - slideWidth / 2 - currentSlide * slideWidth);
    slidesContainer.style.transform = `translateX(${offset}px)`;
  }

  function updateSlideDimensions() {
    slideWidth = slides[0].getBoundingClientRect().width;
    updateSlidePosition();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  }

  leftArrow.addEventListener('click', prevSlide);
  rightArrow.addEventListener('click', nextSlide);

  // Atualiza a posição inicial do slide após todas as imagens serem carregadas
  window.addEventListener('load', function () {
    updateSlideDimensions();
  });

  // Atualiza a posição do slide ao redimensionar a janela
  window.addEventListener('resize', function () {
    updateSlideDimensions();
  });

  // Alterna para o próximo slide a cada 3 segundos
  setInterval(nextSlide, 3000);
});






// animação sobre -----------------------------------------------------------------------------------------------------------------------
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
