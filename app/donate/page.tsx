'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Donate() {

  const router = useRouter();
  
  const donationLinks = [
    { name: 'Buy Me a Coffee', url: 'https://www.buymeacoffee.com/aneeshsoni' },
    { name: 'PayPal', url: 'https://www.paypal.com/donate/?business=5LS2BT4KQMPZ2&no_recurring=1&item_name=We+want+to+help+aspiring+doctors+and+will+keep+medschooliq+free%21+But+if+you%27d+like+to+donate+we%27ve+got+a+few+options+below&currency_code=USD' },
  ];

  return (
    <div className="container">
      <main>
        <h1>Support Us!</h1>
        <p>We want to help aspiring doctors and will keep this free! But if you'd like to donate check out the options below</p>
        
        <div className="donation-links">
          {donationLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="donation-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate via {link.name}
            </motion.a>
          ))}
        </div>
        <footer className="mt-auto py-4">
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="back-button"
              onClick={() => router.push('/')}
            >
              Back to Questions
            </motion.button>
      </footer>
      </main>
    </div>
  );
}
