module.exports = (client) => {
  const status = [
    {
      name: "Tabiel Bot",
    },
    {
      name: "Desenvolvido por Gaab Dev",
    },
    {
      name: "Feito em JavaScript",
    },
  ];

  function setStats() {
    var randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setActivity(randomStatus.name);
  }

  client.user.setStatus("dnd");
  setStats();
  setInterval(() => {
    setStats();
  }, 10 * 1000);
};
