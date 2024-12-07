import type { BlogPost } from '@/lib/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 'introducing-sheltr',
    title: 'Introducing SHELTR: Building Transparent Charitable Giving in Public',
    slug: 'introducing-sheltr',
    author: {
      name: 'Arcana Concept Team',
      avatar: '/images/team/arcana-logo.png',
      title: 'Innovation Team',
      bio: 'Building the future of charitable giving'
    },
    publishedAt: '2024-03-15',
    summary: 'Join us on our journey to revolutionize charitable giving through blockchain technology and transparent impact tracking.',
    content: `
<div class="flex justify-center mb-8">
  <img src="/images/logo/sheltr-logo-dark.svg" alt="SHELTR Logo" class="h-24" />
</div>

# Introducing SHELTR: Building Transparent Charitable Giving in Public

We're excited to officially introduce SHELTR, a groundbreaking initiative by [Arcana Concept](https://www.arcanaconcept.com) that's set to transform how we approach charitable giving and support for homeless individuals across Canada.

## Our Mission

At SHELTR, we're combining blockchain technology with direct community action to create a transparent, efficient, and impactful giving platform. Our mission is simple but ambitious: to hack homelessness using technology.

<div class="my-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
  <h3 class="text-xl font-bold mb-4">🚀 Join the SHELTR Revolution</h3>
  <p class="mb-4">Be part of the change. Sign up now to get early access and exclusive updates.</p>
  <a href="/signup" class="inline-block px-6 py-3 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-100 transition-colors">
    Get Started →
  </a>
</div>

## Building in Public

We believe in transparency not just in our technology, but in our entire development process. That's why we're building SHELTR in public, sharing our journey, challenges, and victories with our community every step of the way.

### Spring 2024 Rollout

We're thrilled to announce our initial rollout across select shelters in Canada this spring. We're starting with strategic partnerships in:

- Vancouver, BC
- Toronto, ON
- Montreal, QC

## Technology Meets Impact

SHELTR isn't just another donation platform. We're leveraging:

- 🔗 Blockchain technology for transparent fund tracking
- 📝 Smart contracts for automated fund allocation
- 📱 QR code technology for instant, direct support
- 📊 Real-time impact visualization

<div class="my-8 p-6 bg-gray-900 rounded-lg text-white">
  <h3 class="text-xl font-bold mb-4">🏠 For Shelters</h3>
  <p class="mb-4">Are you a shelter interested in participating in our initial rollout?</p>
  <a href="/contact" class="inline-block px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors">
    Partner With Us
  </a>
</div>

## Join Our Community

### For Content Creators
We're partnering with TikTok creators and Instagram influencers who are passionate about social impact. If you're interested in collaborating, reach out to us at [partnerships@arcanaconcept.com](mailto:partnerships@arcanaconcept.com).

## Stay Connected

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
  <a href="https://www.tiktok.com/@arcanaconcept" class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <span class="text-xl mr-2">📱</span> TikTok
  </a>
  <a href="https://www.instagram.com/arcanaconcept" class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <span class="text-xl mr-2">📸</span> Instagram
  </a>
  <a href="https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs" class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <span class="text-xl mr-2">🎧</span> Podcast
  </a>
  <a href="https://www.linkedin.com/company/arcana-concept" class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <span class="text-xl mr-2">💼</span> LinkedIn
  </a>
  <a href="https://www.arcanaconcept.com/concepts/sheltr" class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <span class="text-xl mr-2">🌐</span> Website
  </a>
</div>

<div class="my-8 p-6 bg-blue-600 rounded-lg text-white">
  <h3 class="text-xl font-bold mb-4">📬 Stay Updated</h3>
  <p class="mb-4">Subscribe to our newsletter for:</p>
  <ul class="list-disc list-inside mb-4">
    <li>Development updates</li>
    <li>Impact stories</li>
    <li>Partnership announcements</li>
    <li>Community events</li>
    <li>Early access opportunities</li>
  </ul>
  <form class="flex gap-2">
    <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-2 rounded-md text-gray-900" />
    <button type="submit" class="px-6 py-2 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition-colors">
      Subscribe
    </button>
  </form>
</div>

## Get Involved

We're always looking for:
- 🏢 Shelter partners
- 💻 Technology collaborators
- 🤝 Community advocates
- 📱 Content creators
- 💰 Impact investors

Visit [arcanaconcept.com/sheltr](https://www.arcanaconcept.com/concepts/sheltr) to learn more about how you can be part of this revolution in charitable giving.

<div class="my-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white text-center">
  <h3 class="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
  <p class="mb-6">Join us in revolutionizing charitable giving and creating lasting impact.</p>
  <div class="flex gap-4 justify-center">
    <a href="/signup/shelter" class="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition-colors">
      Register Your Shelter
    </a>
    <a href="/signup/donor" class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md font-semibold hover:bg-white/10 transition-colors">
      Become a Donor
    </a>
  </div>
</div>

Together, we can make a measurable difference in addressing homelessness through technology and transparency.

*Follow our journey as we build SHELTR in public and join us in revolutionizing charitable giving.*
    `,
    categories: ['Announcements', 'Technology', 'Impact'],
    image: '/images/blog/introducing-sheltr.jpg'
  }
]; 