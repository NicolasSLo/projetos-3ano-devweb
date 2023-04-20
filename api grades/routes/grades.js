const express = require('express')
const router = express.Router()
const fs = require('fs')



router.post('/', (req, res) => {
  let grade = req.body
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err

      let json = JSON.parse(data)

      grade = {
        id: json.nextId++,
        ...grade,
        timestamp: new Date(),
      }
      json.grades.push(grade)

      fs.writeFile('grades.json', JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message })
        } else {
          res.send(grade)
        }
      })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})



router.get('/:id', (req, res) => {
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)
      const getGradeById = json.grades.find(
        (grade) => grade.id == req.params.id,
      )
      if (getGradeById) {
        res.send(getGradeById)
      } else {
        res.end()
      }
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})



router.delete('/:id', (req, res) => {
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)
      const deleteGrade = json.grades.filter(
        (grade) => grade.id != req.params.id,
      )

      json.grades = deleteGrade
      json.grades.id = json.nextId--

      fs.writeFile('grades.json', JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message })
        } else {
          res.end()
        }
      })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})







router.put('/', (req, res) => {
  const updateGrade = req.body
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)
      const oldIndex = json.grades.findIndex(
        (grade) => grade.id == updateGrade.id,
      )
      json.grades[oldIndex].student = updateGrade.student
      json.grades[oldIndex].subject = updateGrade.subject
      json.grades[oldIndex].type = updateGrade.type
      json.grades[oldIndex].value = updateGrade.value

      fs.writeFile('grades.json', JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message })
        } else {
          res.end()
        }
      })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})



router.get('/get-grade/:student/:subject', (req, res) => {
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)

      const getStudentGrade = json.grades.filter(
        (grade) =>
          grade.student === req.params.student &&
          grade.subject === req.params.subject,
      )

      const getSumGrades = getStudentGrade.reduce((accumulator, current) => {
        return accumulator + current.value
      }, 0)
      res.json({ sum: getSumGrades })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})



router.get('/get-average/:subject/:type', (req, res) => {
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)

      const getSubjectAndType = json.grades.filter(
        (grade) =>
          grade.subject === req.params.subject &&
          grade.type === req.params.type,
      )

      const getSumGrades = getSubjectAndType.reduce((accumulator, current) => {
        return accumulator + current.value
      }, 0)

      const average = getSumGrades / getSubjectAndType.length
      res.json({ average })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})



router.get('/order-grades/:subject/:type', (req, res) => {
  fs.readFile('grades.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)

      const getSubjectAndType = json.grades
        .filter(
          (grade) =>
            grade.subject === req.params.subject &&
            grade.type === req.params.type,
        )
        .map((item) => ({
          student: item.student,
          grade: item.value,
        }))
        .sort((a, b) => b.grade - a.grade)
      res.send(getSubjectAndType)
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})

module.exports = router