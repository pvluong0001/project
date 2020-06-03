import Skill from '@models/skill.model';
import Group from '@models/group.model';
import SkillChart from '@models/skillChart.model';
import {validationResult} from 'express-validator';
import * as skillService from '@services/skill.service';
import {tree2} from '@helpers/base.helper';

export async function index(req, res) {
  const data = await Skill.find().populate('skills');

  res.json({
    data,
    message: 'OK',
  });
}

export async function store(req, res) {
  const validateResult = validationResult(req);

  if (!validateResult.isEmpty()) {
    return res.status(422).json({errors: validateResult.array()});
  }

  const {skills, mode, name} = req.body;

  const dataSkills = await Group.find({
    _id: {
      $in: skills,
    },
  }).lean();

  const {code, message, data} = await skillService.createSkill(dataSkills, mode, name);

  return res.status(code).json({
    message,
    data
  })
}

export async function update(req, res) {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    return res.status(422).json({errors: validateResult.array()});
  }
  const data = await Skill.update(req.params.id, req.body);

  return res.json({
    data,
    message: 'OK',
  });
}

export async function destroy(req, res) {
  const data = await Skill.delete(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: `Delete ${data ? 'success' : 'failed'}!`,
  });
}

export async function show(req, res) {
  const data = await Skill.findById(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: data ? 'OK' : 'Not found!',
    data,
  });
}
