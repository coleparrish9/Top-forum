const router = require('express').Router();
const { Blogpost } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newBlogpost = await Blogpostlogpost.create({
        ...req.body,
        user_id: req.session.user_id,
        });
    
        res.status(200).json(newBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/test', async (req, res) => {
    try{
        console.log("blogpost test route called");
    } catch (err) {
        console.log("error in blogpost test route");
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        console.log("blogpost put route called");
        const blogpostData = await Blogpost.findByPk(req.params.id);
        const updateResponse = await blogpostData.update(
            {
                title: req.body.editTitle,
                content: req.body.editContent,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }
        if(!updateResponse){
            res.status(404).json({ message: 'error updating blogpost' });
            return;
        }
        res.status(200).json(updateResponse);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;