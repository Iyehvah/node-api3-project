const express = require('express');
const userDb = require("./userDb")
const {validateUserId, validateUser} = require("../middlewares/validate")

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  // do your magic!
  userDb.insert(req.body)
  .then((user) => {
    console.log(user)
    res.status(201).json(user)
  })
  .catch(error =>{
    next(error)
  })
});

router.post('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!

});

router.get('/', (req, res, next) => {
  // do your magic!
  const opts ={ 
    sortBy: req.query.sortBy,
    limit: req.query.limit,
  }
  userDb.get(opts)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res, next) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
  .then((userPost) => {
    res.status(200).json(userPost)
  })
  .catch( error => {
    next(error)
  })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
  .then(response => {
    if ( response > 0 ) {
      res.status(200).json({
        message: "User had been deleted"
      })
    } else {
      res.status(404).json({
        message: "User could not be found"
      })
    }
  })
  .catch(error => {
    next(error)
  })
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  // do your magic!
userDb.update(req.params.id, req.body)
.then( response => {
  if( response ) {
    res.status(200).json(req.body)
  } else {
    res.status(404).json({
      message: "User could not be found"
    })
  }
})
.catch(error => {
  next(error)
  })
});

module.exports = router;
