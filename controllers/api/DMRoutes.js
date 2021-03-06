const router = require('express').Router();
const { DM } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const dbDMData = await DM.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.dm_id = dbDMData.id;
        req.session.loggedIn = true;
  
        res.status(200).json(dbDMData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
router.post('/login', async (req, res) => {
    try {
      const dbDMData = await DM.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbDMData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbDMData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.dm_id = dbDMData.id;
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ DM: dbDMData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;