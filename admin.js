
// Referências do Firebase
const dbTimes = db.ref('times');
const dbJogadores = db.ref('jogadores');
const dbJogos = db.ref('jogos');

// Carregar dados iniciais
dbTimes.on('value', (snapshot) => {
  atualizarSelectTimes(snapshot.val());
});

// Cadastro de times
document.getElementById('formTime').addEventListener('submit', function(e) {
  e.preventDefault();
  const nomeTime = document.getElementById('nomeTime').value.trim();
  if (nomeTime) {
    dbTimes.push({ nome: nomeTime });
  }
  this.reset();
});

// Cadastro de jogadores
document.getElementById('formJogador').addEventListener('submit', function(e) {
  e.preventDefault();
  const jogador = {
    nome: document.getElementById('nomeJogador').value.trim(),
    posicao: document.getElementById('posicaoJogador').value.trim(),
    numero: document.getElementById('numeroJogador').value.trim(),
    time: document.getElementById('selectTime').value,
    gols: 0
  };
  
  if (jogador.nome && jogador.posicao && jogador.numero && jogador.time) {
    dbJogadores.push(jogador);
  }
  this.reset();
});

// Cadastro de jogos
document.getElementById('formJogo').addEventListener('submit', function(e) {
  e.preventDefault();
  const jogo = {
    timeA: document.getElementById('timeA').value.trim(),
    timeB: document.getElementById('timeB').value.trim(),
    data: document.getElementById('dataJogo').value,
    hora: document.getElementById('horaJogo').value,
    golsA: 0,
    golsB: 0,
    aoVivo: document.getElementById('aoVivo').checked,
    finalizado: false
  };
  
  if (jogo.timeA && jogo.timeB && jogo.data && jogo.hora && jogo.timeA !== jogo.timeB) {
    dbJogos.push(jogo);
  } else if (jogo.timeA === jogo.timeB) {
    alert('Um time não pode jogar contra si mesmo!');
  }
  this.reset();
});

// Atualizar select de times
function atualizarSelectTimes(times) {
  const select = document.getElementById('selectTime');
  select.innerHTML = '<option value="" disabled selected>Selecione um time</option>';
  
  if (times) {
    Object.values(times).forEach(time => {
      const option = document.createElement('option');
      option.value = time.nome;
      option.textContent = time.nome;
      select.appendChild(option);
    });
  }
}

// Listener para atualização em tempo real
dbJogos.on('value', (snapshot) => {
  const lista = document.getElementById('listaJogos');
  lista.innerHTML = '';
  
  snapshot.forEach((childSnapshot) => {
    const jogo = childSnapshot.val();
    const key = childSnapshot.key;
    
    const li = document.createElement('li');
    li.style.marginBottom = '15px';
    li.style.padding = '10px';
    li.style.border = '1px solid #ddd';
    li.style.borderRadius = '4px';
    
    li.innerHTML = `
      <strong>${jogo.timeA} ${jogo.golsA} x ${jogo.golsB} ${jogo.timeB}</strong>
      <br>📅 ${jogo.data} ⏰ ${jogo.hora}
      ${jogo.aoVivo ? "<span style='color:red; font-weight:bold;'> AO VIVO</span>" : ""}
      <br>
      <button onclick="atualizarGols('${key}', 'A')">+ Gol ${jogo.timeA}</button>
      <button onclick="atualizarGols('${key}', 'B')">+ Gol ${jogo.timeB}</button>
      <button onclick="finalizarJogo('${key}')">Finalizar Jogo</button>
    `;
    lista.appendChild(li);
  });
});

// Funções globais para atualização
function atualizarGols(key, time) {
  const ref = db.ref(`jogos/${key}`);
  ref.transaction((jogo) => {
    if (jogo) {
      if (time === 'A') jogo.golsA++;
      if (time === 'B') jogo.golsB++;
    }
    return jogo;
  });
}

function finalizarJogo(key) {
  db.ref(`jogos/${key}`).update({
    aoVivo: false,
    finalizado: true
  });
}