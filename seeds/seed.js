const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userSeeds.json');
const blogData = require('./blogSeeds.json');
const commentData = require('./commentSeeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    for (const user of userData) {
      await User.create({
        ...user
      });
    }
  
    for (const blog of blogData) {
      await Blog.create({
        ...blog
      });
    }

    const comments = await Comment.bulkCreate(commentData);
  
    process.exit(0);
  };
  
  seedDatabase();