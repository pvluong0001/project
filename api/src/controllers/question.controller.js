import Question from '@models/question.model';
import { validationResult } from 'express-validator';
import Answer from '@models/answer.model';
import pick from 'lodash/pick';

export async function index(req, res) {
  const data = await Question.getAll({});

  res.json({
    data,
    message: 'OK'
  });
}

export async function store(req, res) {
  const session = await Question.startSession();
  session.startTransaction();
  let data = null;

  try {
    let answersId = [];

    /** create answers */
    if(req.body.answers) {
      const answerData = req.body.answers;
      const answers = await Answer.insertMany(answerData);
      answersId = answers.map(item => item._id);
    }

    /** create question */
    const questionData = pick(req.body, ['title']); 

    data = await Question.store({
      ...questionData,
      answers: answersId
    });
    session.commitTransaction();
  } catch(e) {
    session.abortTransaction();

    return res.status(422).json({
      errors: e.message
    })
  } finally {
    session.endSession();
  }

  return res.json({
    data,
    message: data ? 'Create success!' : 'Create failed!'
  });
}

export async function update(req, res) {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    return res.status(422).json({errors: validateResult.array()});
  }
  const data = await Question.update(req.params.id, req.body);

  return res.json({
    data,
    message: 'OK'
  });
}

export async function destroy(req, res) {
  const data = await Question.delete(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: `Delete ${data ? 'success' : 'failed'}!`,
  });
}

export async function show(req, res) {
  const data = await Question.findById(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: data ? 'OK' : 'Not found!',
    data
  });
}
