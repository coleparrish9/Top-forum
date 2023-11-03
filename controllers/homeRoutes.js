const router = require('express').Router();
const {User, Blogpost, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log("homepage route called");

    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,

        },
        {
          model: Comment,
          include: [
            {
              model: User,

            },
          ],
        },
      ],
    });

    const Blogposts = blogpostData.map((BlogPost) => BlogPost.get({ plain: true }));
    console.log("rendering homepage");
    res.render('homepage', { 
      Blogposts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);

  }
});



router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });
    console.log("user: ");
    console.log(user);
    res.status(200).render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("error rendering dashboard");
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    console.error("signup route called when user is already logged in");
    res.redirect('/');
    return;
  }
  if (req.session.logged_in === false) {
    res.render('signup', {
      logged_in: req.session.logged_in  
    });
    return;
  }

  else{
    console.log("no session detected, rendering signup page");
    res.render('signup', {
      logged_in: req.session.logged_in  
    });
    return;
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    console.error("login route called when user is already logged in");
    res.redirect('/');
    return;
  }

  if (req.session.logged_in === false) {
    res.render('login', {
      logged_in: req.session.logged_in 
    });
    return;
  }

  else{
    console.log("no session detected, rendering login page");
    res.render('login', {
      logged_in: req.session.logged_in  
    });
    return;
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in === false) {
    console.error("logout route called when user is not logged in");
    res.redirect('/login');
    return;
  }
  console.log("logging out user");
  req.session.destroy(() => {
    console.log("user logged out");
    console.log("rendering logout page");
    res.status(200).render('logout', {logged_in: false});
  });
  return;
});

module.exports = router;