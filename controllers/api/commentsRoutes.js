const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');
const dayjs = require('dayjs');

router.get('/:post_id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                blogpost_id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {

        res.status(500).json(err);
    }
});


router.post('/:blogpost_id', withAuth, async (req, res) => { 
    console.log("comment post route called");
    try {
        console.log("req.body: ");
        console.log(req.body);
        const newComment = await Comment.create({
        content: req.body.commentContent,
        commenter_id: req.session.user_id,
        blogpost_id: req.params.blogpost_id,
        date_created: dayjs(),
        });
    
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => { 
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;