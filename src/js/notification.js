const requestPermission = () => {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    console.log("Fitur notifikasi diijinkan.");
  });
};

const showNotification = () => {
  const title = "Football League Update";
  const options = {
    body: "Ini adalah konten notifikasi. \nBisa menggunakan baris baru.",
    icon: "/img/logo.png",
    badge: "/img/logo.png",
    actions: [
      {
        action: "yes-choice",
        title: "Open",
      },
      {
        action: "no-choice",
        title: "Close",
      },
    ],
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("FItur notifikasi tidak diijinkan.");
  }
};

export { requestPermission };
