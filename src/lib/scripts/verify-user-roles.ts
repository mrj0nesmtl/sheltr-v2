const testUsers = [
  {
    email: 'joel@arcanaconcept.com',
    role: 'super_admin',
    expectedPath: '/super-admin/dashboard'
  },
  {
    email: 'joel.yaffe+admin@gmail.com',
    role: 'admin',
    expectedPath: '/admin/dashboard'
  },
  {
    email: 'joel.yaffe+donor@gmail.com',
    role: 'donor',
    expectedPath: '/donor/dashboard'
  },
  {
    email: 'joel.yaffe+participant@gmail.com',
    role: 'participant',
    expectedPath: '/participant/dashboard'
  }
]; 