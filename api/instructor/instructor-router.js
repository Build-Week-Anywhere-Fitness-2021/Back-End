const router = require('express').Router();
const Classes = require('./instructor-model');
const {checkInstructor} = require('../middleware/instructor-middleware');
const restricted = require('../middleware/restricted-middleware');

router.get('/', (req, res) => {
  Classes.getClasses()
    .then(cls => {
      res.status(200).json(cls);
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

// router.get('/users', (req, res) => {
//   Classes.getUsers()
//     .then(user => {
//       res.status(200).json({user});
//     })
//     .catch(err => {
//       res.status(500).json({error: err.message});
//     });
// });

router.post('/', restricted, (req, res) => {
Classes.addClass(req.body)
    .then(newClass => {
      res.status(200).json({newClass});
    })
    .catch(err => {
      res.status(500).json({message: 'Error adding class: ', error: err.message});
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const {id} = req.params;

  Classes.updateClass(id, changes)
    .then(updatedClass => {
      if (updatedClass) {
        res.status(200).json({updatedClass});
      } else {
        res.status(404).json({error: 'Please provide all of the necessary class information.'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Error updating class: ', error: err.message});
    });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Classes.removeClass(id)
      .then(deleted => {
          res.json({removed: deleted});
      })
      .catch(err => {
          res.status(500).json({message: 'Classes must not have enrolled users before deletion' });
      });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  Classes.getClassById(id)
    .then(cls => {
      res.status(200).json({cls});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

module.exports = router;