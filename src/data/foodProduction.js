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
    'Soups', 'Sauces', 'Bakery', 'Meat', 'Vegetables', 'Indian Regional', 'Garde Manger', 'Larder', 'Advanced Science', 'Cost Control', 'Food Styling', 'Culinary History'
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
      url: '#',
      topic: 'Basics',
      description: 'A comprehensive guide to professional kitchen equipment.',
      author: 'Bevpedia Editorial Team',
      year: '2024',
      pages: 'N/A',
      publisher: 'Bevpedia'
    },
    {
      id: 'm2',
      title: 'Food Science & Nutrition',
      type: 'Notes',
      url: '#',
      topic: 'Theory',
      description: 'Fundamental principles of food science in culinary arts.',
      author: 'Bevpedia Editorial Team',
      year: '2024',
      pages: 'N/A',
      publisher: 'Bevpedia'
    },
    {
      id: 'm4',
      title: 'A Whisker Away',
      type: 'PDF',
      topic: 'Bakery',
      url: 'https://drive.google.com/file/d/1vVJ8jQn7h-R7xsgNtElEhTAoBmpFbh-B/view?usp=drive_link',
      kindleUrl: 'https://www.amazon.com/Whisker-Away-Slice-Joy-Every-ebook/dp/B0CYHMJ2DZ?ref_=saga_dp_bnx_dsk_dp',
      description: 'To every baker who flipped these pages with flour on their fingers and curiosity in their heart.',
      publisher: 'Bevpedia'
    },
    {
      id: 'm5',
      title: 'The Art of Baking',
      type: 'PDF',
      topic: 'Bakery',
      url: 'https://drive.google.com/file/d/1dWXjLWbgmfRu0Cn8SZgX6NTIrTVccp_X/view?usp=drive_link',
      kindleUrl: 'https://www.amazon.in/art-cooking-Cookie-delight-ebook/dp/B0FD76Z797',
      description: 'Cookies are more than just treats—bake boldly, mess up sweetly, and share generously.',
      publisher: 'Bevpedia'
    },
    {
      id: 'm6',
      title: 'Rings of Joy',
      type: 'PDF',
      topic: 'Bakery',
      url: 'https://drive.google.com/file/d/12NYGmV4eBIpXMejkDK-4O9-CbpkdYo-w/view?usp=drive_link',
      kindleUrl: 'https://www.amazon.com/Rings-Joy-Delight-Whisker-English-ebook/dp/B0FG1736MW',
      description: 'Soft, golden, and crafted with care—your one-stop guide to donuts of every kind.',
      publisher: 'Bevpedia'
    },
    {
      id: 'm3',
      title: 'Bakery & Confectionery Handbook',
      type: 'PDF',
      topic: 'Bakery',
      url: '#',
      description: 'Detailed recipes and techniques for professional bakery.',
      publisher: 'Bevpedia'
    },
    {
      id: 'm7',
      title: '1,000 Food Art and Styling Ideas',
      type: 'PDF',
      topic: 'Food Styling',
      url: 'https://drive.google.com/file/d/11eaiD3N-kh4R9KuoZVST0qPJEN8VAQCZ/view?usp=drive_link',
      description: 'Mouthwatering Food Presentations from Chefs, Photographers, and Bloggers from Around the Globe.',
      author: 'Ari Bendersky',
      publisher: 'Rockport Publishers',
      year: '2013',
      edition: 'Illustrated Edition',
      pages: '320',
      isbn: '978-1-59253-859-1'
    },
    {
      id: 'm8',
      title: 'Principles of Food, Beverage, and Labor Cost Controls',
      type: 'PDF',
      topic: 'Cost Control',
      url: 'https://drive.google.com/file/d/1Qrqym3UOhhAnTBSJQfFdaMUEu7_O4jNO/view?usp=drive_link',
      description: 'A comprehensive guide to professional cost control and financial management in F&B operations.',
      author: 'Paul R. Dittmer & J. Desmond Keefe',
      publisher: 'John Wiley & Sons',
      year: '2009',
      edition: '9th Edition',
      pages: '633',
      isbn: '978-0-471-78347-3'
    },
    {
      id: 'm9',
      title: '120 Recipes from Britain’s Best Chefs',
      type: 'PDF',
      topic: 'Recipes',
      url: 'https://drive.google.com/file/d/1H9IDNYwRmnrr1SEh27Z5pjIlJ_jm1TZU/view?usp=drive_link',
      description: 'A debut cookbook featuring modern British cuisine and recipes from the UK’s leading culinary professionals.'
    },
    {
      id: 'm10',
      title: 'Modernist Cuisine: Animals and Plants',
      type: 'PDF',
      topic: 'Advanced Science',
      url: 'https://drive.google.com/file/d/1FOG7NA3wYgwvIIOymfbEd4WshCC7PZAn/view?usp=drive_link',
      description: 'Volume 3 of the groundbreaking 6-volume modernist set — focusing on the art and science of cooking animals and plants.',
      author: 'Nathan Myhrvold, Chris Young & Maxime Bilet',
      publisher: 'The Cooking Lab',
      year: '2011',
      edition: 'First Edition',
      pages: '~400',
      isbn: '978-0-9827610-0-7'
    },
    {
      id: 'm11',
      title: 'A Historical Dictionary of Indian Food',
      type: 'PDF',
      topic: 'Culinary History',
      url: 'https://drive.google.com/file/d/19jNvFY97ZTo2jmSo4z-JQN4qUnrUkzPr/view?usp=drive_link',
      description: 'A masterpiece by K.T. Achaya documenting the extensive historical heritage of the Indian culinary landscape.',
      author: 'K. T. Achaya',
      publisher: 'Oxford University Press',
      year: '1998',
      edition: 'First Edition (Reprinted 2001–02)',
      pages: '347–364',
      isbn: '0-19-564254-6'
    }
  ]
};
