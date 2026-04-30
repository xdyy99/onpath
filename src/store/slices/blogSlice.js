import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [
    {
      id: 1,
      title: 'From Noise to Narrative',
      slug: 'from-noise-to-narrative',
      thumbnail: '/images/blog/blog11.jpg',
      thumbnailpaint: '/images/blog/blog1-b.jpg',
      date: 'April 28, 2026',
      author: 'Onpath Studio',
      category: 'Lifestyle',
      content: {
        image: [
          '/images/blog/blog11.jpg',
          '/images/blog/blog12.jpg',
          '/images/blog/blog13.jpg',
          '/images/blog/blog14.jpg',
        ],
        heading: [
          'When everything felt loud,\nI started listening',
          'A late evening,\na quiet question',
          'Finding the\nCollaborator’s Circle',
        ],
        paragraph: [
          'When I first decided to take content creation seriously, everything felt loud. Every platform pushed a new trend. Every week, there was a new format to follow. I kept posting, saving ideas, trying to keep up — until my work slowly started looking like everyone else’s. The more I chased what was popular, the quieter my own voice became.',
          'One evening, after editing a video that could have been anyone’s, I stopped. The city outside my window was glowing with late lights, cars moving slowly below. My screen reflected back a version of my work that felt rushed and borrowed. I asked myself a simple question: is this what I want to build?',
          'I hadn’t started creating to blend in. I started because I loved telling stories, shaping moods, creating something that felt personal. So instead of posting that night, I closed the app and searched for inspiration that felt slower. More intentional. That’s when I found Onpath Studio — and then, the Collaborator’s Circle.',
          'It didn’t feel like another brand chasing attention. Everything about it felt thoughtful — the visuals, the storytelling, the way creativity was treated as craft. The Circle spoke about long-term collaboration. About creators working closely with a studio instead of simply promoting products. About keeping individuality while building something meaningful together.',
          'Joining the Collaborator’s Circle didn’t suddenly solve everything. I still had to create. I still had moments of doubt. But something shifted. I stopped chasing noise. With Onpath’s creative guidance, I began to focus on storytelling, on building an aesthetic that felt true to me — content driven by intention rather than algorithms.',
          'The Collaborator’s Circle didn’t turn me into a different creator. It helped me become a more grounded one. In a world that constantly pushes creators to move faster and follow what’s trending, Onpath Studio quietly teaches you to create with purpose. And that changed everything.',
        ],
        imagepaint: [
          '/images/blog/blog2-b.jpg',
          '/images/blog/blog3-b.jpg',
          '/images/blog/blog4-b.jpg',
        ],
      },
    },
    {
      id: 2,
      title: 'Stories Worth Telling: Inside Onpath Studio’s Creative Community',
      slug: 'stories-worth-telling',
      thumbnail: '/images/blog/blog21.jpg',
      thumbnailpaint: '/images/blog/blog2-b.jpg',
      date: 'April 27, 2026',
      author: 'Onpath Studio',
      category: 'Lifestyle',
      content: {
        image: [
          '/images/blog/blog21.jpg',
          '/images/blog/blog22.jpg',
          '/images/blog/blog23.jpg',
          '/images/blog/blog24.jpg',
        ],
        heading: [
          'Stories worth\ntelling',
          'A different kind\nof collaboration',
          'Growing\ntogether',
        ],
        paragraph: [
          'There’s a reason stories stick with us. They shape how we see the world, influence how we feel, and often change the way we live. At Onpath Studio, storytelling isn’t just a marketing tool — it’s the foundation of everything we create. Instead of designing clothing around trends or seasonal cycles, Onpath builds each collection as a narrative, blending fashion, art, and human experience into something lasting and intentional.',
          'Onpath isn’t looking for influencers to push products on social media. The studio partners with storytellers and creators who understand that fashion can carry emotion, symbolism, and narrative depth. There are no strict briefs. No mandatory deliverables. No pressure to perform for an algorithm — only space for thoughtful creation, where originality is encouraged and creative freedom is protected.',
          'Every creator’s journey is different, so the Collaborator Circle is designed around evolving partnerships rather than fixed expectations. From the entry-level Studio Collaborator to the Narrative Partner and Creative Ambassador tiers, each step opens deeper access to mentorship, exclusive collections, private events, co-created limited editions, and shared revenue on collaborative projects.',
          'The Circle centers on intentional storytelling. The studio prefers content that feels carefully crafted, where light, mood, composition, and pacing all serve the narrative. Emotion matters as much as aesthetics — the goal isn’t quick impressiveness but deep resonance: nostalgia, curiosity, joy, reflection.',
          'Joining begins with sharing your strongest work — five pieces that best reflect your voice, alongside a brief reflection on your creative philosophy. Each submission is reviewed by the creative team, focused on originality, narrative strength, and value alignment rather than audience size. Once welcomed, creators receive a curated onboarding experience, creative guidance, community access, and ongoing support.',
          'The Collaborator’s Circle isn’t about paid promotion or transactional partnerships. It’s about building relationships with creators who believe stories matter, who see fashion as an art form, and who want to create work that feels genuine and endures beyond the moment it’s posted. If your process is driven by intention rather than attention, start with your portfolio. Send us your five strongest pieces — we’ll take it from there.',
        ],
        imagepaint: [
          '/images/blog/blog3-b.jpg',
          '/images/blog/blog4-b.jpg',
          '/images/blog/blog5-b.jpg',
        ],
      },
    },
  ],
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Add reducers if needed
  },
})

export default blogSlice.reducer
