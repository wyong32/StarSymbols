<template>
  <div class="privacy-page">
    <!-- Header -->
    <AppHeader />

    <!-- Privacy Content -->
    <section class="privacy-section">
      <div class="section-container">
        <div class="privacy-content">
          <div class="last-updated">
            <p><strong>Last Updated:</strong> {{ lastUpdated }}</p>
          </div>

          <div class="privacy-section-item">
            <h2>1. Information We Collect</h2>
            <h3>1.1 Information You Provide</h3>
            <p>
              We may collect information you voluntarily provide when using our services, including:
            </p>
            <ul>
              <li>Text input for our text generation tools</li>
              <li>Images uploaded for conversion (processed locally, not stored)</li>
              <li>Feedback and contact information when you reach out to us</li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            <p>We may automatically collect certain information about your device and usage:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system information</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
            </ul>
          </div>

          <div class="privacy-section-item">
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide and improve our star symbol and text generation services</li>
              <li>To analyze usage patterns and optimize user experience</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div class="privacy-section-item">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third
              parties, except:
            </p>
            <ul>
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist in operating our website</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </div>

          <div class="privacy-section-item">
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your information:</p>
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information</li>
              <li>Secure data storage practices</li>
            </ul>
          </div>

          <div class="privacy-section-item">
            <h2>5. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve our services and user experience</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>
          </div>

          <div class="privacy-section-item">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your information</li>
              <li>Data portability where applicable</li>
            </ul>
          </div>

          <div class="privacy-section-item">
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect
              personal information from children under 13. If we become aware that we have collected
              such information, we will take steps to delete it promptly.
            </p>
          </div>

          <div class="privacy-section-item">
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div class="privacy-section-item">
            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div class="contact-info">
              <p><strong>Email:</strong> privacy@starcopy.com</p>
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
.privacy-page {
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

.privacy-section {
  padding: 5rem 0;
  background: white;
}

/* Privacy Content */
.privacy-content {
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
  border-left: 4px solid #667eea;
}

.last-updated p {
  margin: 0;
  color: #667eea;
  font-size: 0.95rem;
}

.privacy-section-item {
  margin-bottom: 3rem;
}

.privacy-section-item:last-child {
  margin-bottom: 0;
}

.privacy-section-item h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.privacy-section-item h3 {
  font-size: 1.2rem;
  color: #555;
  margin: 1.5rem 0 0.75rem 0;
}

.privacy-section-item p {
  margin-bottom: 1rem;
  color: #666;
  line-height: 1.7;
}

.privacy-section-item ul {
  margin: 1rem 0 1rem 1.5rem;
  color: #666;
}

.privacy-section-item li {
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

  .privacy-content {
    padding: 2rem 1.5rem;
  }

  .privacy-section-item h2 {
    font-size: 1.3rem;
  }

  .privacy-section-item h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .privacy-section {
    padding: 3rem 0;
  }

  .privacy-content {
    padding: 1.5rem 1rem;
  }

  .last-updated {
    padding: 0.75rem 1rem;
  }

  .contact-info {
    padding: 1rem;
  }
}
</style>
