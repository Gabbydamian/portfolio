import './About.css';
const ABOUT = () => {
  return(
    <div className="container">
        <section id="about-section">
            <div className="about-text">
                <h2 className="about-text_heading">Hey! I'm <span>Damian Gabriel</span>
                </h2>
                <p className="about-text_body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                id doloremque ab nostrum natus corporis aliquid, fugiat velit
                voluptatum, at quae aut, eum maiores earum maxime. Doloribus
                neque dolorem debitis!
                </p>
                <div className="buttons">
                <a href="#resume" id="btn2" className="btn">Download Resume</a>
                <a href="#contact" className="btn">Hire Me</a>
                </div>
            </div>
            <div className="about-img">
            
            </div>
        </section>
    </div>
    )
};

export default ABOUT;