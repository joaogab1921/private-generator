const letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const especiais = '!@#$%^&*()_+=-[]{}|;:,.<>?';

const gerarCaracteres = (pool, quantidade) => {
  let resultado = '';
  for (let i = 0; i < quantidade; i++) {
    resultado += pool.charAt(Math.floor(Math.random() * pool.length));
  }
  return resultado;
};

document.getElementById('tamanhoTotal').addEventListener('input', function () {
  document.getElementById('tamanhoLabel').textContent = this.value;
});

document.getElementById('personalizarQtd').addEventListener('change', function () {
  document.getElementById('qtdPersonalizada').classList.toggle('hidden', !this.checked);
});

document.getElementById('gerar').addEventListener('click', () => {
  const usarLetras = document.getElementById('usarLetras').checked;
  const usarNumeros = document.getElementById('usarNumeros').checked;
  const usarEspeciais = document.getElementById('usarEspeciais').checked;
  const personalizar = document.getElementById('personalizarQtd').checked;

  const sequencia = document.getElementById('sequencia').value || '';
  const tamanhoTotal = parseInt(document.getElementById('tamanhoTotal').value);

  let senha = '';
  let totalSolicitado = sequencia.length;

  if (personalizar) {
    const qtdLetras = usarLetras ? parseInt(document.getElementById('qtdLetras').value) || 0 : 0;
    const qtdNumeros = usarNumeros ? parseInt(document.getElementById('qtdNumeros').value) || 0 : 0;
    const qtdEspeciais = usarEspeciais ? parseInt(document.getElementById('qtdEspeciais').value) || 0 : 0;

    totalSolicitado += qtdLetras + qtdNumeros + qtdEspeciais;

    if (totalSolicitado > tamanhoTotal) {
      alert(`A soma dos elementos (${totalSolicitado}) excede o tamanho total da senha (${tamanhoTotal}).`);
      return;
    }

    if (usarLetras) senha += gerarCaracteres(letras, qtdLetras);
    if (usarNumeros) senha += gerarCaracteres(numeros, qtdNumeros);
    if (usarEspeciais) senha += gerarCaracteres(especiais, qtdEspeciais);
  } else {
    let caracteres = '';
    if (usarLetras) caracteres += letras;
    if (usarNumeros) caracteres += numeros;
    if (usarEspeciais) caracteres += especiais;

    if (!caracteres.length) {
      alert("Selecione pelo menos um tipo de caractere.");
      return;
    }

    const restante = tamanhoTotal - sequencia.length;
    senha += gerarCaracteres(caracteres, restante);
  }

  senha += sequencia;

  // Embaralhar
  senha = senha.split('').sort(() => 0.5 - Math.random()).join('');
  document.getElementById('senhaGerada').value = senha;
});

document.getElementById('copiar').addEventListener('click', () => {
  const senha = document.getElementById('senhaGerada');
  senha.select();
  document.execCommand('copy');
  alert('Senha copiada!');
});

//animação

document.addEventListener("DOMContentLoaded", () => {
    const headerSection = document.querySelector(".header");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerSection.classList.add("visible");
        } else {
          headerSection.classList.remove("visible");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(headerSection);
  });

  //
  