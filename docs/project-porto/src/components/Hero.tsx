import './Hero.css'

interface HeroProps {
    user: string;
}

export const Hero: React.FC<HeroProps> = ({ user }) => {
    return (
        <>
            <section className='hero'>
                <div className="hero-content">
                    <div className='menyapa'>
                        <h2>Hello {user}, Welcome to My Website 👋</h2>
                        
                    </div>
                    
                    <h1 className="gradient-text">I'm Faisal Amiruddin</h1>
                    <p>Trying to Become a Full Stack Developer</p>
                    <button>Explore My Portofolio</button>
                </div>
                <div className='scroll-indicator'>
                    <i className='fas fa-chevron-down'></i>
                </div>
            </section>
        </>
    );
}