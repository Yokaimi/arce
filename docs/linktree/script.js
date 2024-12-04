class PP extends React.Component {
    render() {
        return (
            <div>
                <img 
                    src="https://i.pinimg.com/736x/ba/38/3b/ba383bb405c436b3237a90decfd2dbc4.jpg" 
                    alt="Profile Picture"
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
    render() {
        return (
            <div class="tombol">
                <a target="_blank" href="https://id.linkedin.com/in/faisal-amiruddin-4965292ba"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a target="_blank" href="https://github.com/Yokaimi"><i class="fab fa-github"></i> Github</a>
                <a target="_blank" href="https://www.instagram.com/faisalamiruddin_"><i class="fab fa-instagram"></i> Instagram</a>
                <a target="_blank" href="https://tiktok.com/@lothic_"><i class="fab fa-tiktok"></i> Tiktok</a>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="container">
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
