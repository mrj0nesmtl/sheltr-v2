import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  );
}
