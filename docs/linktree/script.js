const MobileNotification = () => {
    const [visible, setVisible] = React.useState(true);
    const [countdown, setCountdown] = React.useState(3);
  
    React.useEffect(() => {
      let timerId;
      let countdownId;
  
      if (visible) {
        countdownId = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownId);
            }
            return prev - 1;
          });
        }, 1000);
  
        timerId = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }
  
      return () => {
        clearTimeout(timerId);
        clearInterval(countdownId);
      };
    }, [visible]);
  
    if (!visible) return null;
  
    return (
      <div className="mobile-notification">
        <div className="card-notif">
            <img src="capo.gif" />
            <h2>Untuk pengalaman visual dan interaktif yang optimal, disarankan untuk mengakses situs web ini menggunakan komputer pribadi atau laptop.</h2>
        </div>
        <p className="close-text" onClick={() => setVisible(false)}>Ketuk disini untuk close</p>
        <p className="countdown-text">Otomatis akan ditutup dalam {countdown}</p>
      </div>
    );
  };
  
  class PP extends React.Component {
      render() {
          return (
              <div>
                  <img 
                      src="https://media.tenor.com/ipuTozw3PXsAAAAj/pixel-cat.gif" 
                      alt="Image"
                  />
              </div>
          );
      }
  }
  
  class Intro extends React.Component {
      render() {
          return (
              <div className="text">
                  <h1>Hello, My Name is Faisal Amiruddin</h1>
                  <h2>Informatics Engineering Student at UNS</h2>
              </div>
          );
      }
  }
  
  class Medsos extends React.Component {
    componentDidMount() {
      const hoverSound = new Audio('hover_sound.mp3');
      const hoverItems = document.querySelectorAll('.hover-item');
      let currentlyPlaying = null;
  
      hoverItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          if (currentlyPlaying) {
            hoverSound.pause();
            hoverSound.currentTime = 0;
          }
  
          currentlyPlaying = item;
          hoverSound.play();
        });
  
        item.addEventListener('mouseleave', () => {
          if (currentlyPlaying === item) {
            hoverSound.pause();
            hoverSound.currentTime = 0;
            currentlyPlaying = null;
          }
        });
      });
    }
  
    render() {
      return (
        <div className="tombol">
          <a className="hover-item" target="_blank" href="https://id.linkedin.com/in/faisal-amiruddin-4965292ba"><i className="fab fa-linkedin"></i> LinkedIn</a>
          <a className="hover-item" target="_blank" href="https://github.com/Yokaimi"><i className="fab fa-github"></i> Github</a>
          <a className="hover-item" target="_blank" href="https://www.instagram.com/faisalamiruddin_"><i className="fab fa-instagram"></i> Instagram</a>
          <a className="hover-item" target="_blank" href="https://tiktok.com/@lothic_"><i className="fab fa-tiktok"></i> Tiktok</a>
        </div>
      );
    }
  }
  
  class App extends React.Component {
      render() {
          return (
              <div className="container">
                  <MobileNotification />
                  <div className="sisi-kiri">
                      <PP />
                      <Intro />
                  </div>
                  <div className="sisi-kanan">
                      <Medsos />
                  </div>
              </div>
          );
      }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));
