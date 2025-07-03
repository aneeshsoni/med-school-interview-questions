'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Coffee, CreditCard, Heart } from 'lucide-react';

export default function Donate() {
  const router = useRouter();

  const donationLinks = [
    {
      name: 'Buy Me a Coffee',
      url: 'https://www.buymeacoffee.com/aneeshsoni',
      icon: Coffee,
      description: 'Support with a coffee ☕',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'PayPal',
      url: 'https://www.paypal.com/donate/?business=5LS2BT4KQMPZ2&no_recurring=1&item_name=We+want+to+help+aspiring+doctors+and+will+keep+medschooliq+free%21+But+if+you%27d+like+to+donate+we%27ve+got+a+few+options+below&currency_code=USD',
      icon: CreditCard,
      description: 'Secure payment via PayPal',
      color: 'from-blue-500 to-indigo-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Support This Project
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to keeping this tool free for aspiring doctors.
            If you find it helpful, consider supporting us to help maintain and improve it.
          </p>
        </motion.div>

        {/* Donation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {donationLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${link.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{link.name}</h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                    <Button
                      asChild
                      className={`w-full bg-gradient-to-r ${link.color} hover:opacity-90 text-white border-0`}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Heart className="h-4 w-4" />
                        Support via {link.name}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Every contribution helps us maintain and improve this tool for future medical students.
                Thank you for your support! 🙏
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            size="lg"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </Button>
        </motion.footer>
      </div>
    </div>
  );
}
