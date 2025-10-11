    // Show or skip based on localStorage
    if (localStorage.getItem('skipWelcome') === 'true') {
      welcomeEl?.classList.add('hide');
    }

    enterBtn?.addEventListener('click', () => {
      if (skipChk?.checked) localStorage.setItem('skipWelcome', 'true');
      closeWelcome();
    });
    skipToTeam?.addEventListener('click', () => {
      if (skipChk?.checked) localStorage.setItem('skipWelcome', 'true');
      closeWelcome();
    });