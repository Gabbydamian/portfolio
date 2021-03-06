import './Navbar.css'
const NAVBAR = () => {
  return(
    <div className="navbar">
        <div className="logo-box">
            <a href="#top"><h1 className="logo">Astrid</h1></a>
        </div>
        <nav>
            <ul className="nav-list">
                <li className="nav-item active"><a href="#home" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="#skills"  className="nav-link">Skills</a></li>
                <li className="nav-item"><a href="#projects"  className="nav-link">Projects</a></li>
                <li className="nav-item"><a href="#resume"  className="nav-link">Resume</a></li>
                <a className="btn" href="#contact">Hire me</a>
            </ul>
        </nav>
    </div>
    )
};

export default NAVBAR;