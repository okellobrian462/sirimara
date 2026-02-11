-- Update Terms of Service Content
UPDATE page_sections
SET content = '<p>Welcome to Sirimara. By accessing our website, you agree to these legal terms.</p>
<h3>1. Acceptance of Terms</h3>
<p>By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
<h3>2. Use of Services</h3>
<p>You may use our services only as permitted by law. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>
<h3>3. Intellectual Property</h3>
<p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.</p>
<h3>4. Disclaimer of Warranties</h3>
<p>THE SERVICES ARE PROVIDED "AS IS". WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIM AND NEGATE ALL OTHER WARRANTIES, INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.</p>'
WHERE page = 'terms-of-service' AND section_type = 'legal';

-- Update Privacy Policy Content
UPDATE page_sections
SET content = '<p>Your privacy is important to us. It is Sirimara''s policy to respect your privacy regarding any information we may collect from you across our website.</p>
<h3>1. Information We Collect</h3>
<p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
<h3>2. How We Use Information</h3>
<p>We may use the information we collect in various ways, including to:</p>
<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Communicate with you, either directly or through one of our partners</li>
</ul>
<h3>3. Security</h3>
<p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>'
WHERE page = 'privacy-policy' AND section_type = 'legal';
