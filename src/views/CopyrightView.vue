<template>
  <div class="copyright-page">
    <!-- Header -->
    <AppHeader />

    <!-- Copyright Content -->
    <section class="copyright-section">
      <div class="section-container">
        <div class="copyright-content">
          <div class="copyright-notice">
            <h2>© 2025 Star Copy & Paste. All Rights Reserved.</h2>
            <p>This website and its original content are protected by copyright law.</p>
          </div>

          <div class="copyright-section-item">
            <h2>1. Unicode Symbols</h2>
            <h3>Free to Use</h3>
            <p>All star symbols provided on this website are Unicode characters that are:</p>
            <ul>
              <li>Part of the Unicode Standard maintained by the Unicode Consortium</li>
              <li>Free to use for personal and commercial purposes</li>
              <li>Not subject to copyright restrictions</li>
              <li>Available for use without attribution requirements</li>
            </ul>

            <h3>Symbol Sources</h3>
            <p>Our star symbols are sourced from various Unicode blocks including:</p>
            <ul>
              <li>Miscellaneous Symbols (U+2600–U+26FF)</li>
              <li>Dingbats (U+2700–U+27BF)</li>
              <li>Miscellaneous Symbols and Pictographs (U+1F300–U+1F5FF)</li>
              <li>Emoticons (U+1F600–U+1F64F)</li>
            </ul>
          </div>

          <div class="copyright-section-item">
            <h2>2. Website Content</h2>
            <h3>Our Original Content</h3>
            <p>The following elements are protected by copyright:</p>
            <ul>
              <li>Website design and layout</li>
              <li>Original text content and descriptions</li>
              <li>Logo and branding elements</li>
              <li>Code and software implementations</li>
              <li>Curated symbol collections and categorizations</li>
            </ul>

            <h3>Usage Rights</h3>
            <p>You may:</p>
            <ul>
              <li>Use Unicode symbols freely without restriction</li>
              <li>Share links to our website</li>
              <li>Reference our content with proper attribution</li>
            </ul>

            <p>You may not:</p>
            <ul>
              <li>Copy our website design or layout</li>
              <li>Reproduce our branding or logo</li>
              <li>Create derivative works of our original content</li>
              <li>Use our content for competing services</li>
            </ul>
          </div>

          <div class="copyright-section-item">
            <h2>3. Generated Content</h2>
            <h3>Text Art and Generated Text</h3>
            <p>Content generated using our tools:</p>
            <ul>
              <li>Text art created from your images belongs to you</li>
              <li>Decorated text generated with our tools is yours to use</li>
              <li>No copyright claims are made on user-generated content</li>
              <li>You retain full rights to your original images and text</li>
            </ul>
          </div>

          <div class="copyright-section-item">
            <h2>4. Third-Party Content</h2>
            <p>We respect the intellectual property rights of others:</p>
            <ul>
              <li>All Unicode symbols are used in accordance with Unicode licensing</li>
              <li>Any third-party content is properly attributed</li>
              <li>We respond promptly to valid copyright concerns</li>
            </ul>
          </div>

          <div class="copyright-section-item">
            <h2>5. DMCA Compliance</h2>
            <p>
              We comply with the Digital Millennium Copyright Act (DMCA). If you believe your
              copyright has been infringed:
            </p>
            <ul>
              <li>Contact us immediately with details of the alleged infringement</li>
              <li>Provide proof of copyright ownership</li>
              <li>We will investigate and respond promptly to valid claims</li>
            </ul>
          </div>

          <div class="copyright-section-item">
            <h2>6. Attribution Guidelines</h2>
            <h3>When Attribution is Appreciated</h3>
            <p>While not required for Unicode symbols, attribution is appreciated when:</p>
            <ul>
              <li>Referencing our curated collections</li>
              <li>Sharing our educational content</li>
              <li>Using our tools for commercial projects</li>
            </ul>

            <h3>How to Attribute</h3>
            <p>Simple attribution format:</p>
            <div class="attribution-example">
              <p>"Star symbols courtesy of Star Copy & Paste (starcopy.com)"</p>
            </div>
          </div>

          <div class="copyright-section-item">
            <h2>7. Commercial Use</h2>
            <p>Unicode star symbols may be used commercially without restriction, including:</p>
            <ul>
              <li>Business logos and branding</li>
              <li>Marketing materials and advertisements</li>
              <li>Product designs and packaging</li>
              <li>Digital applications and websites</li>
              <li>Print publications and media</li>
            </ul>
          </div>

          <div class="copyright-section-item">
            <h2>8. Contact for Copyright Issues</h2>
            <p>For copyright-related inquiries or concerns:</p>
            <div class="contact-info">
              <p><strong>Email:</strong>delldremo9898@gmail.com</p>
              <p><strong>Subject Line:</strong> Copyright Inquiry - [Brief Description]</p>
              <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
            </div>
          </div>

          <div class="disclaimer">
            <h3>Legal Disclaimer</h3>
            <p>
              This information is provided for educational purposes. For specific legal advice
              regarding copyright matters, please consult with a qualified attorney.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
/* Global Styles */
.copyright-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Section Styles */
.section-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.copyright-section {
  padding: 5rem 0;
  background: white;
}

/* Copyright Content */
.copyright-content {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 3rem;
}

.copyright-notice {
  text-align: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 3rem;
}

.copyright-notice h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.copyright-notice p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.copyright-section-item {
  margin-bottom: 3rem;
}

.copyright-section-item:last-child {
  margin-bottom: 0;
}

.copyright-section-item h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4facfe;
}

.copyright-section-item h3 {
  font-size: 1.2rem;
  color: #555;
  margin: 1.5rem 0 0.75rem 0;
}

.copyright-section-item p {
  margin-bottom: 1rem;
  color: #666;
  line-height: 1.7;
}

.copyright-section-item ul {
  margin: 1rem 0 1rem 1.5rem;
  color: #666;
}

.copyright-section-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.attribution-example {
  background: #f0f8ff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #4facfe;
  margin: 1rem 0;
}

.attribution-example p {
  margin: 0;
  font-style: italic;
  color: #333;
}

.contact-info {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.contact-info p {
  margin-bottom: 0.5rem;
  color: #333;
}

.contact-info p:last-child {
  margin-bottom: 0;
}

.disclaimer {
  background: #fff9e6;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #ffa500;
  margin-top: 2rem;
}

.disclaimer h3 {
  color: #e67e00;
  margin-bottom: 0.5rem;
}

.disclaimer p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-container {
    padding: 0 1rem;
  }

  .copyright-content {
    padding: 2rem 1.5rem;
  }

  .copyright-notice {
    padding: 1.5rem;
  }

  .copyright-notice h2 {
    font-size: 1.5rem;
  }

  .copyright-section-item h2 {
    font-size: 1.3rem;
  }

  .copyright-section-item h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .copyright-section {
    padding: 3rem 0;
  }

  .copyright-content {
    padding: 1.5rem 1rem;
  }

  .copyright-notice {
    padding: 1rem;
  }

  .attribution-example {
    padding: 0.75rem 1rem;
  }

  .contact-info {
    padding: 1rem;
  }

  .disclaimer {
    padding: 1rem;
  }
}
</style>
