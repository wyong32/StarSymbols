<template>
  <div class="terms-page">
    <!-- Header -->
    <AppHeader />

    <!-- Terms Content -->
    <section class="terms-section">
      <div class="section-container">
        <div class="terms-content">
          <div class="last-updated">
            <p><strong>Last Updated:</strong> {{ lastUpdated }}</p>
          </div>

          <div class="terms-intro">
            <p>
              Welcome to Star Copy & Paste. These Terms of Service ("Terms") govern your use of our
              website and services. By accessing or using our services, you agree to be bound by
              these Terms.
            </p>
          </div>

          <div class="terms-section-item">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not
              use this service.
            </p>
          </div>

          <div class="terms-section-item">
            <h2>2. Description of Service</h2>
            <p>Star Copy & Paste provides:</p>
            <ul>
              <li>A collection of Unicode star symbols for copying and pasting</li>
              <li>Text generation tools with star decorations</li>
              <li>Image to text art conversion services</li>
              <li>Related educational and informational content</li>
            </ul>
          </div>

          <div class="terms-section-item">
            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to harm or disrupt our services</li>
              <li>Not upload malicious content or viruses</li>
              <li>Respect intellectual property rights</li>
              <li>Not engage in any automated data collection without permission</li>
            </ul>
          </div>

          <div class="terms-section-item">
            <h2>4. Intellectual Property</h2>
            <p>
              The Unicode star symbols provided are part of the Unicode standard and are free to
              use. However:
            </p>
            <ul>
              <li>Our website design, layout, and original content are protected by copyright</li>
              <li>You may not reproduce our website design or branding</li>
              <li>
                Generated text art and symbols may be used freely for personal and commercial
                purposes
              </li>
            </ul>
          </div>

          <div class="terms-section-item">
            <h2>5. Privacy and Data</h2>
            <p>Your privacy is important to us:</p>
            <ul>
              <li>Images uploaded for conversion are processed locally and not stored</li>
              <li>We do not collect or store your generated text content</li>
              <li>Please refer to our Privacy Policy for detailed information</li>
            </ul>
          </div>

          <div class="terms-section-item">
            <h2>6. Disclaimer of Warranties</h2>
            <p>Our services are provided "as is" without any warranties:</p>
            <ul>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>We are not responsible for any damages resulting from service use</li>
              <li>Symbol compatibility may vary across different platforms and devices</li>
            </ul>
          </div>

          <div class="terms-section-item">
            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or
              revenues.
            </p>
          </div>

          <div class="terms-section-item">
            <h2>8. Service Modifications</h2>
            <p>We reserve the right to:</p>
            <ul>
              <li>Modify or discontinue our services at any time</li>
              <li>Update our symbol collections and tools</li>
              <li>Change these terms with appropriate notice</li>
            </ul>
          </div>

          <div class="terms-section-item">
            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your access to our services immediately, without prior
              notice, for conduct that we believe violates these Terms or is harmful to other users
              or our services.
            </p>
          </div>

          <div class="terms-section-item">
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              jurisdiction in which our company is incorporated, without regard to conflict of law
              principles.
            </p>
          </div>

          <div class="terms-section-item">
            <h2>11. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div class="contact-info">
              <p><strong>Email:</strong> legal@starcopy.com</p>
              <p>
                <strong>Address:</strong> Star Copy & Paste, 123 Web Street, Internet City, IC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// Data
const lastUpdated = ref('January 15, 2024')
</script>

<style scoped>
/* Global Styles */
.terms-page {
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

.terms-section {
  padding: 5rem 0;
  background: white;
}

/* Terms Content */
.terms-content {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 3rem;
}

.last-updated {
  background: #f8f9ff;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border-left: 4px solid #f5576c;
}

.last-updated p {
  margin: 0;
  color: #f5576c;
  font-size: 0.95rem;
}

.terms-intro {
  background: #fff5f5;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border-left: 4px solid #f5576c;
}

.terms-intro p {
  margin: 0;
  color: #333;
  font-size: 1.05rem;
  line-height: 1.7;
}

.terms-section-item {
  margin-bottom: 3rem;
}

.terms-section-item:last-child {
  margin-bottom: 0;
}

.terms-section-item h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f5576c;
}

.terms-section-item p {
  margin-bottom: 1rem;
  color: #666;
  line-height: 1.7;
}

.terms-section-item ul {
  margin: 1rem 0 1rem 1.5rem;
  color: #666;
}

.terms-section-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
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

/* Responsive Design */
@media (max-width: 768px) {
  .section-container {
    padding: 0 1rem;
  }

  .terms-content {
    padding: 2rem 1.5rem;
  }

  .terms-section-item h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .terms-section {
    padding: 3rem 0;
  }

  .terms-content {
    padding: 1.5rem 1rem;
  }

  .last-updated {
    padding: 0.75rem 1rem;
  }

  .terms-intro {
    padding: 1rem;
  }

  .contact-info {
    padding: 1rem;
  }
}
</style>
