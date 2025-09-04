import { IoLogoGithub } from "react-icons/io";
const Footer = () => {
  return (
    <footer className="bg-surface-primary text-primary-text">
      <p className="text-center items-center m-1.5">
        &copy; 2025 - Feito por{" "}
        <a
          href="https://github.com/MatheusMedeiros-Dev/mini-blog"
          target="blank"
          className="inline-flex items-center gap-1"
        >
          MatheusMedeiros-Dev
          <IoLogoGithub />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
