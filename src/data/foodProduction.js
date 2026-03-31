export const foodProductionData = {
  semesters: [
    { id: 1, name: 'Semester 1', description: 'Basics of Food Production' },
    { id: 2, name: 'Semester 2', description: 'Intermediate Culinary Techniques' },
    { id: 3, name: 'Semester 3', description: 'Quantity Food Production' },
    { id: 4, name: 'Semester 4', description: 'Regional Indian Cuisine' },
    { id: 5, name: 'Semester 5', description: 'International Cuisine' },
    { id: 6, name: 'Semester 6', description: 'Advanced Garde Manger & Larder' }
  ],
  topics: [
    'Soups', 'Sauces', 'Bakery', 'Meat', 'Vegetables', 'Indian Regional', 'Garde Manger', 'Larder'
  ],
  videos: [
    {
      id: 'v1',
      title: 'Introduction to Knife Skills',
      videoId: 'G-Fg7l7G1zw', // Example YouTube ID
      semester: 1,
      topic: 'Basics',
      description: 'Mastering the essential knife cuts for every chef.'
    },
    {
      id: 'v2',
      title: 'The Five Mother Sauces',
      videoId: 'l6Y7-7fV_M8',
      semester: 1,
      topic: 'Sauces',
      description: 'A deep dive into Béchamel, Velouté, Espagnole, Tomato, and Hollandaise.'
    },
    {
      id: 'v3',
      title: 'Classic Consommé Technique',
      videoId: 'pBvW_0h9H6k',
      semester: 2,
      topic: 'Soups',
      description: 'Learn the clarification process for a crystal clear consommé.'
    },
    {
      id: 'v4',
      title: 'Regional Indian: Mughlai Cuisine',
      videoId: 'Qon9R8mZ_Yo',
      semester: 4,
      topic: 'Indian Regional',
      description: 'Authentic techniques for Mughlai gravies and kebabs.'
    }
    // More videos can be added here
  ],
  studyMaterials: [
    {
      id: 'm1',
      title: 'Culinary Basics: Tools & Equipment',
      type: 'PDF',
      url: '#', // Placeholder
      topic: 'Basics',
      description: 'A comprehensive guide to professional kitchen equipment.'
    },
    {
      id: 'm2',
      title: 'Food Science & Nutrition',
      type: 'Notes',
      url: '#',
      topic: 'Theory',
      description: 'Fundamental principles of food science in culinary arts.'
    },
    {
      id: 'm4',
      title: 'A Whisker Away',
      type: 'PDF',
      topic: 'Bakery',
      url: 'https://drive.google.com/file/d/1vVJ8jQn7h-R7xsgNtElEhTAoBmpFbh-B/view?usp=drive_link',
      kindleUrl: 'https://www.amazon.com/Whisker-Away-Slice-Joy-Every-ebook/dp/B0CYHMJ2DZ?ref_=saga_dp_bnx_dsk_dp',
      description: 'To every baker who flipped these pages with flour on their fingers and curiosity in their heart. I hope you found confidence in the crumb, comfort in the frosting, and a little creativity in every slice.'
    },
    {
      id: 'm5',
      title: 'The art of Baking',
      type: 'PDF',
      topic: 'Bakery',
      url: 'https://drive.google.com/file/d/1dWXjLWbgmfRu0Cn8SZgX6NTIrTVccp_X/view?usp=drive_link',
      kindleUrl: 'https://www.amazon.in/art-cooking-Cookie-delight-ebook/dp/B0FD76Z797',
      description: 'From My Oven to Yours... Cookies are more than just treats. They’re tiny moments of joy. This booklet was created to not only teach - but to inspire. So bake boldly. Mess up sweetly. Share generously.'
    },
    {
      id: 'm6',
      title: 'Rings of Joy',
      type: 'PDF',
      topic: 'Bakery',
      url: 'https://drive.google.com/file/d/12NYGmV4eBIpXMejkDK-4O9-CbpkdYo-w/view?usp=drive_link',
      kindleUrl: 'https://www.amazon.com/Rings-Joy-Delight-Whisker-English-ebook/dp/B0FG1736MW',
      description: 'Soft, golden, and crafted with care—this booklet is your one-stop guide to donuts of every kind. From the first rise to the final glaze, every step is written to be friendly, foolproof, and fun.'
    },
    {
      id: 'm3',
      title: 'Bakery & Confectionery Handbook',
      type: 'PDF',
      topic: 'Bakery',
      url: '#',
      description: 'Detailed recipes and techniques for professional bakery.'
    }
  ]
};
