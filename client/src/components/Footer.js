export default function Footer()
{

    return(
        <footer>
        <div className="footer-content">
          <h3 id="footerLogo">Bvent</h3>
          <div id="footerOptions">
            <p className="footerLink" onClick={() => window.location.pathname = "/become-organizer"}>Devino Organizator</p>
            <p className="footerLink">Despre</p>
            <p className="footerLink" >Contact</p>
          </div>
          <p id="copyright">&copy; 2023 Pixel. All rights reserved.</p>
        </div>
      </footer>
    )
}