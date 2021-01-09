import express from 'express';
const router = express.Router();
import normalize from 'normalize-url';
import { auth } from '../../middleware/auth.js';
import User from '../../models/User.js';
import Profile from '../../models/Profile.js';
import Post from '../../models/Post.js';
import { check, validationResult } from 'express-validator';

// GET api/profile/myprofile
// Get current user's profile
// private
router.get('/myprofile', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', [
      'firstName',
      'middleName',
      'lastName',
      'avatar',
      'isAdmin',
    ]);

    if (!profile) {
      return res.status(400).json({
        msg: 'No profile for this user',
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// POST api/profile
// Create/update user profile
// private
router.post(
  '/:userId',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('favourites', 'Your favourite fruits & veggies?').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      website,
      favourites,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      city,

      // spread the rest of the fields that do not need to be checked
      ...rest
    } = req.body;

    // build profile object
    const profileFields = {
      user: req.params.userId,
      website:
        website && website !== ''
          ? normalize(website, {
              forceHttps: true,
            })
          : '',
      favourites: Array.isArray(favourites)
        ? favourites
        : favourites.split(',').map(fav => ' ' + fav.trim()),

      // capitalizing the first letter of every word
      // source: https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
      city:
        city && city !== ''
          ? city
              .toLowerCase()
              .split(' ')
              .map(c => c.charAt(0).toUpperCase() + c.substring(1))
              .join(' ')
          : '',
      ...rest,
    };

    const socialFields = {
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    };

    // normalise social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key] = normalize(value, {
          forceHttps: true,
        });
      }
    }

    // add to profileFields
    profileFields.social = socialFields;

    try {
      // using upsert option (creates new doc if no match is found)
      let profile = await Profile.findOneAndUpdate(
        {
          user: req.params.userId,
        },
        {
          $set: profileFields,
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// GET api/profile
// Get all profiles
// public
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// GET api/profile/user/:user_id
// Get a certain user's profile by id
// public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', [
      'firstName',
      'middleName',
      'lastName',
      'avatar',
      'isAdmin',
    ]);

    if (!profile) {
      return res.status(404).json({
        msg: 'This user has no profile',
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// DELETE api/profile
// Delete a user, profile and posts by id
// private
router.delete('/user/:user_id', auth, async (req, res) => {
  try {
    /* // Remove user posts
    I would rather keep the posts even if the user gets deleted
    await Post.deleteMany({ user: req.user.id });
    But at least I'll have the (dis)likes removed, as it affects the number of (dis)likes
    */

    // check if the user has profile
    const profile = await Profile.findOne({ user: req.params.user_id });
    const user = await User.findOne({ _id: req.params.user_id });

    // reset avatar first
    await User.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        avatar:
          'https://gravatar.com/avatar/a9a5b0968dbea215c3fc8dd56c0234a5?d=mm&r=pg&s=200',
      },
      { new: true }
    );

    // remove all likes and dislikes
    // if the deleted user hasn't posted anything before
    // search her/his id from all the posts
    const posts =
      (await Post.find({ user: req.params.user_id }).length) > 0
        ? await Post.find({ user: req.params.user_id })
        : await Post.find({});

    const likeRemoveIndex = posts.map(post =>
      post.likes.map(like => like.user.toString()).indexOf(req.params.user_id)
    );
    const dislikeRemoveIndex = posts.map(post =>
      post.dislikes
        .map(dislike => dislike.user.toString())
        .indexOf(req.params.user_id)
    );

    if (!profile) {
      // if the user has no profile, just remove user, likes and dislikes
      posts.map(post => post.likes.splice(likeRemoveIndex, 1));
      posts.map(post => post.dislikes.splice(dislikeRemoveIndex, 1));
      await posts.map(post => post.save());
      await User.findOneAndRemove({ _id: req.params.user_id });
    } else {
      // if the user has both, remove both as well as likes and dislikes
      post.likes.splice(likeRemoveIndex, 1);
      post.dislikes.splice(dislikeRemoveIndex, 1);
      await post.save();
      await profile.remove();
      await user.remove();
    }

    res.json({
      msg: 'Successfully deleted the user and profile',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT api/profile/experience
// Add profile experience
// private
router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'Start date?')
      .notEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      title,
      company,
      city,
      ...rest
      /* state,
      from,
      to,
      current,
      description, */
    } = req.body;

    const newExp = {
      title: title
        .toLowerCase()
        .split(' ')
        .map(c => c.charAt(0).toUpperCase() + c.substring(1))
        .join(' '),
      company: company
        .toLowerCase()
        .split(' ')
        .map(c => c.charAt(0).toUpperCase() + c.substring(1))
        .join(' '),
      city: city
        .toLowerCase()
        .split(' ')
        .map(c => c.charAt(0).toUpperCase() + c.substring(1))
        .join(' '),
      ...rest,
      /* state,
      from,
      to,
      current,
      description, */
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// DELETE api/profile/experience/:exp_id
// Delete experience from profile
// private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({
      user: req.user.id,
    });

    foundProfile.experience = foundProfile.experience.filter(
      exp => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();

    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// PUT api/profile/education
// Add profile education
// private
router.put(
  '/education',
  [
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'Start date?')
      .notEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      school,
      fieldofstudy,
      ...rest
      /* degree,
      from,
      to,
      current,
      description, */
    } = req.body;

    const newEdu = {
      school: school
        .toLowerCase()
        .split(' ')
        .map(c => c.charAt(0).toUpperCase() + c.substring(1))
        .join(' '),
      fieldofstudy: fieldofstudy
        .toLowerCase()
        .split(' ')
        .map(c => c.charAt(0).toUpperCase() + c.substring(1))
        .join(' '),
      ...rest,
      /* degree,
      from,
      to,
      current,
      description, */
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// DELETE api/profile/education/:edu_id
// Delete education from profile
// private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({
      user: req.user.id,
    });

    foundProfile.education = foundProfile.education.filter(
      edu => edu._id.toString() !== req.params.edu_id
    );

    await foundProfile.save();

    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
