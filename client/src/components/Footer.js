export default function Footer()
{

    return(
        <footer>
        <div className="footer-content">
          <h3 id="footerLogo">Bvent</h3>
          <div id="footerOptions">
            <p onClick={() => window.location.pathname = "/become-organizer"}>Devino Organizator</p>
            <p>Despre</p>
            <p>Contact</p>
          </div>
          <p id="copyright">&copy; 2023 Pixel. All rights reserved.</p>
        </div>
      </footer>
    )
}