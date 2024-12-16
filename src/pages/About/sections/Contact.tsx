import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Contact() {
  const contacts = [
    {
      title: 'Email Us',
      description: 'Get in touch with our support team',
      icon: Mail,
      action: 'Send Email',
      href: 'mailto:support@sheltr.org'
    },
    {
      title: 'Discord Community',
      description: 'Join our developer community',
      icon: MessageCircle,
      action: 'Join Discord',
      href: 'https://discord.gg/sheltr'
    },
    {
      title: 'GitHub',
      description: 'Contribute to our open source project',
      icon: Github,
      action: 'View GitHub',
      href: 'https://github.com/sheltr'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <contact.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{contact.title}</h3>
              </div>

              <p className="text-gray-300 mb-6">{contact.description}</p>

              <Button asChild>
                <a href={contact.href}>{contact.action}</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
