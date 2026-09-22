document.getElementById('recruit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nick = document.getElementById('nick').value;
    const dob = document.getElementById('dob').value;
    const msgEl = document.getElementById('recruit-msg');

    try {
        const res = await fetch('/api/recruit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nick, dob })
        });
        const data = await res.json();

        if (res.ok) {
            msgEl.innerHTML = `<span style="color: #00ff00;">Solicitação enviada com sucesso!</span>`;
            e.target.reset();
        } else {
            msgEl.innerHTML = `<span style="color: #ff4444;">${data.message || 'Erro ao enviar.'}</span>`;
        }
    } catch (error) {
        msgEl.innerHTML = `<span style="color: #ff4444;">Erro de conexão com servidor.</span>`;
    }
});