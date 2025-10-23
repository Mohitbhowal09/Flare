// Mock marketplace data
const templates = [
  {
    id: '1',
    name: 'Minimalist Overlay Pack',
    description: 'Clean and professional overlays for any stream',
    price: 9.99,
    thumbnail: 'https://placehold.co/300x200/4a5568/FFFFFF?text=Minimalist',
    previewUrl: 'https://example.com/minimalist-preview',
    category: 'overlays',
    rating: 4.8,
    downloads: 1245
  },
  {
    id: '2',
    name: 'Neon Alerts Bundle',
    description: 'Bright and flashy alert animations',
    price: 14.99,
    thumbnail: 'https://placehold.co/300x200/e53e3e/FFFFFF?text=Neon',
    previewUrl: 'https://example.com/neon-preview',
    category: 'alerts',
    rating: 4.6,
    downloads: 876
  },
  {
    id: '3',
    name: 'Gaming Transitions Pack',
    description: 'Smooth transitions for scene changes',
    price: 12.99,
    thumbnail: 'https://placehold.co/300x200/38a169/FFFFFF?text=Gaming',
    previewUrl: 'https://example.com/gaming-preview',
    category: 'transitions',
    rating: 4.9,
    downloads: 2103
  },
  {
    id: '4',
    name: 'Podcast Scene Pack',
    description: 'Professional scenes for podcasters',
    price: 19.99,
    thumbnail: 'https://placehold.co/300x200/3182ce/FFFFFF?text=Podcast',
    previewUrl: 'https://example.com/podcast-preview',
    category: 'scenes',
    rating: 4.7,
    downloads: 932
  }
];

exports.getTemplates = (req, res) => {
  const { category } = req.query;
  let filteredTemplates = templates;
  
  if (category) {
    filteredTemplates = templates.filter(t => t.category === category);
  }
  
  res.json(filteredTemplates);
};

exports.getTemplateById = (req, res) => {
  const { id } = req.params;
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  
  res.json(template);
};

exports.purchaseTemplate = (req, res) => {
  const { templateId } = req.body;
  const template = templates.find(t => t.id === templateId);
  
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  
  // In a real app, process payment here
  // For demo, just return success
  res.json({ 
    message: 'Purchase successful', 
    template,
    downloadUrl: `https://example.com/downloads/${templateId}`
  });
};
