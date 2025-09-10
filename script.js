// ===== CÓDIGO ORIGINAL (já existente) =====
// Menu responsivo
const menuBtn = document.createElement("button");
menuBtn.innerHTML = "☰";
menuBtn.classList.add("menu-btn");
document.querySelector("header").prepend(menuBtn);

const navLinks = document.querySelector("header div");
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Modo escuro/claro
const themeBtn = document.createElement("button");
themeBtn.innerHTML = "🌙";
themeBtn.classList.add("theme-btn");
document.querySelector("header").append(themeBtn);

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeBtn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Scroll suave
document.querySelectorAll("header a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").replace("#", "");
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Botão voltar ao topo
const topBtn = document.createElement("button");
topBtn.innerHTML = "⬆";
topBtn.classList.add("top-btn");
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animações de entrada
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("main section").forEach(sec => {
    observer.observe(sec);
});

// ===== NOVAS FUNÇÕES =====

// 1. Efeito de digitação animada no título
const title = document.querySelector("header h1");
const titleText = title.textContent;
title.textContent = "";
let i = 0;
function typeWriter() {
    if (i < titleText.length) {
        title.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// 2. Carrossel de imagens na seção imagem
const imgSection = document.querySelector(".imagem img");
const imgList = [
    "https://i.imgur.com/2nCt3Sb.png",
    "https://i.imgur.com/Ta5t4nP.jpeg",
    "https://i.imgur.com/8km1MOP.jpeg"
];
let imgIndex = 0;
setInterval(() => {
    imgIndex = (imgIndex + 1) % imgList.length;
    imgSection.src = imgList[imgIndex];
}, 4000);

// 3. Contador animado
const contador = document.createElement("div");
contador.classList.add("contador");
contador.innerHTML = `
  <p><span id="episodios">0</span> episódios</p>
  <p><span id="temporadas">0</span> temporadas</p>
`;
document.querySelector("main").appendChild(contador);

function animateCounter(id, final) {
    let num = 0;
    const el = document.getElementById(id);
    const interval = setInterval(() => {
        num++;
        el.textContent = num;
        if (num >= final) clearInterval(interval);
    }, 50);
}
animateCounter("episodios", 87);
animateCounter("temporadas", 4);

// 4. Pop-up de boas-vindas (apenas 1x)
if (!localStorage.getItem("visited")) {
    setTimeout(() => {
        alert("👋 Bem-vindo ao site Ataque dos Titãs!");
        localStorage.setItem("visited", "true");
    }, 1000);
}

// 5. Sistema de comentários local
const commentBox = document.createElement("div");
commentBox.classList.add("comments");
commentBox.innerHTML = `
  <h3>Deixe seu comentário</h3>
  <textarea id="commentInput" placeholder="Escreva algo..."></textarea>
  <button id="sendComment">Enviar</button>
  <div id="commentList"></div>
`;
document.querySelector("main").appendChild(commentBox);

const sendBtn = document.getElementById("sendComment");
const input = document.getElementById("commentInput");
const list = document.getElementById("commentList");

sendBtn.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        const newComment = document.createElement("p");
        newComment.textContent = input.value;
        list.appendChild(newComment);
        input.value = "";
    }
});
