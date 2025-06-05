import { database } from './firebase.js';

// Referências
const matchesRef = database.ref('matches');
const standingsRef = database.ref('standings');

// Atualiza jogos em tempo real
matchesRef.orderByChild('status').equalTo('live').on('value', (snapshot) => {
    const tbody = document.querySelector('#live-matches tbody');
    tbody.innerHTML = snapshot.exists() ? 
        renderMatches(snapshot.val()) : 
        '<tr><td colspan="3">Nenhum jogo em andamento</td></tr>';
    
    document.getElementById('last-update').textContent = `Atualizado: ${new Date().toLocaleTimeString()}`;
});

function renderMatches(matches) {
    return Object.keys(matches).map(key => {
        const m = matches[key];
        return `
            <tr class="${m.status === 'live' ? 'match-live' : ''}">
                <td>${m.home} vs ${m.away}</td>
                <td class="goals">${m.home_score || 0} - ${m.away_score || 0}</td>
                <td>${m.status === 'live' ? '🔴 AO VIVO' : 'Encerrado'}</td>
            </tr>
        `;
    }).join('');
}