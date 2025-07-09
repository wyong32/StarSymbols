<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="star-icon">⭐</span>
            <h3>StarSymbols</h3>
          </div>
          <p>Your one-stop toolkit for symbols, generators, and creative text art.</p>
          <ul>
            <li>
              <a
                href="https://turbo0.com/item/starsymbols"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.turbo0.com/badge-listed-light.svg"
                  alt="Listed on Turbo0"
                  style="height: 30px; width: auto"
                />
              </a>
            </li>
            <li>
              <a href="https://magicbox.tools" target="_blank">
                <img
                  src="https://magicbox.tools/badge.svg"
                  alt="Featured on MagicBox.tools"
                  width="100"
                  height="30"
                />
              </a>
            </li>
            <li>
              <a href="https://twelve.tools" target="_blank"
                ><img
                  src="https://twelve.tools/badge0-light.svg"
                  alt="Featured on Twelve Tools"
                  width="100"
                  height="30"
              /></a>
            </li>
            <li>
              <a
                class="footer-link"
                href="https://www.facebook.com/people/Starsymbolsio/61577152511872/"
                target="_blank"
              >
                <img
                  class="footer-icon"
                  src="/images/icon/icon_2.ico"
                  alt="toolpilot"
                  srcset="/images/icon/icon_2.ico"
                />
              </a>
            </li>
            <li>
              <a
                class="footer-link"
                href="https://x.com/JessicaGar75864/status/1934532852001239379"
                target="_blank"
              >
                <img
                  class="footer-icon"
                  src="/images/icon/icon_3.ico"
                  alt="toolpilot"
                  srcset="/images/icon/icon_3.ico"
                />
              </a>
            </li>
          </ul>
          <div class="footer-copyright">© 2025 StarSymbols. All rights reserved.</div>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>Navigation</h4>
            <ul>
              <li><router-link to="/all-star-symbols">All Star Symbols</router-link></li>
              <li><router-link to="/text-symbol-generator">Text Symbol Generator</router-link></li>
              <li><router-link to="/image-to-text">Image To Text</router-link></li>
              <li><router-link to="/blog">Blog</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/contact">Contact Us</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><router-link to="/privacy">Privacy Policy</router-link></li>
              <li><router-link to="/terms">Terms of Service</router-link></li>
              <li><router-link to="/copyright">Copyright</router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>Made with ⭐ for creators everywhere. Spread the sparkle! ✨</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer */
.footer {
  background: #2d3748;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-brand ul {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-brand ul li {
  list-style: none;
  font-size: 0;
}

.footer-brand .footer-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
}

.footer-brand .footer-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo h3 {
  font-size: 1.5rem;
  color: white;
}

.footer-brand p {
  color: #a0aec0;
  line-height: 1.6;
}

.footer-copyright {
  color: #718096;
  font-size: 0.9rem;
}

.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.footer-column h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li {
  margin-bottom: 0.5rem;
}

.footer-column a,
.footer-column router-link {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-column a:hover,
.footer-column router-link:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #4a5568;
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  color: #a0aec0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer {
    padding: 1rem 0;
  }
  .footer-container {
    padding: 0 1rem;
  }

  .footer-logo h3 {
    font-size: 1.2rem;
  }

  .footer-brand p {
    font-size: 0.9rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .footer-links {
    gap: 1rem;
  }
  .footer-column h4 {
    font-size: 1rem;
  }
  .footer-column li {
    margin-bottom: 0.2rem;
  }
  .footer-column a,
  .footer-column router-link {
    font-size: 0.8rem;
  }

  .footer-bottom p {
    font-size: 0.8rem;
  }
}
</style>
