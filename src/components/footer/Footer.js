import './footer.css'
import { UserAuth } from '../context/AuthContext';
import { FaGithubSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";



const Footer = () => {

    const { theme } = UserAuth()


  return (
    <div className='footer' data-theme={theme} >
        <div className="footer-list">
            <ul>
                <li><a href="#"> <FaGithubSquare /> </a></li>
                <li><a href="#"> <FaTwitterSquare /> </a></li>
                <li><a href="#"> <BsLinkedin /> </a></li>
            </ul>
        </div>
        <div className="footer-copyright">
            <p>Copyright &copy; 2022 NoNameWebsite </p>
        </div>
    </div>
  );
}

export default Footer;
