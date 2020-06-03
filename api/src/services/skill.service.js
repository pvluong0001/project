import {tree, tree2} from '@helpers/base.helper';
import {v4} from 'uuid';
import Skill from '@models/skill.model';
import SkillChart from '@models/skillChart.model';

export function convertSkills(skills, mode = 'auto') {
  switch (mode) {
    case 'single':

      return [];
    case 'auto':
      const treeSkills = tree(skills, undefined);

      return __convertSkillsChart(treeSkills);
  }
}

function __convertSkillsChart(skills = [], output = [], parent = {}) {
  const skillsLength = skills.length;

  if(skillsLength === 1) {
    const skill = skills[0]
    const id = v4()

    if(skill.children && skill.children.length) {
      const hasId = skill.hasOwnProperty('_id')


      if(parent.hasParent) {
        const parentIndex = output.findIndex(item => item.id === parent.parentId)

        output[parentIndex].ref = [id]

        if(!output[parentIndex].label) {
          output[parentIndex].label = []
        }

        output[parentIndex].label.push({
          refId: id,
          name: skill.name,
          isRef: false
        })
      }

      const arrName = skill.children.map(item => item.name)

      output.push({
        title: `${hasId ? skill.name : 'Mixed'} (${arrName.join(' - ')})`,
        id: id,
        parent: parent.hasParent ? parent.parentId: null
      })

      output = __convertSkillsChart(skill.children, output, {
        parentId: id,
        hasParent: true,
        parentName: skill.name
      })
    } else {
      if(parent.hasParent) {
        const parentIndex = output.findIndex(item => item.id === parent.parentId)

        if(!output[parentIndex].label) {
          output[parentIndex].label = []
        }

        output[parentIndex].label.push({
          refId: id,
          name: skill.name,
          isRef: true
        })
      }
    }
  } else {
    const id = v4()

    if (!parent.hasParent) {

      const groupName = skills.map(skill => skill.name).join(' - ');

      output.push({
        title: `Mixed (${groupName})`,
        id
      })
    }

    skills.forEach(skill => {
      const id = v4()

      if(skill.children && skill.children.length) {

        if(parent.hasParent) {
          const parentIndex = output.findIndex(item => item.id === parent.parentId)

          if(!output[parentIndex].ref) {
            output[parentIndex].ref = []
          }

          output[parentIndex].ref.push(id)

          if(!output[parentIndex].label) {
            output[parentIndex].label = []
          }

          output[parentIndex].label.push({
            refId: id,
            name: skill.name,
            isRef: true
          })
        }

        const arrName = skill.children.map(item => item.name)

        output.push({
          title: `${skill.name} (${arrName.join(' - ')})`,
          id,
          parent: parent.hasParent ? parent.parentId : null,
        })

        output = __convertSkillsChart(skill.children, output, {
          parentId: id,
          hasParent: true,
          parentName: skill.name
        })
      } else {
        if(parent.hasParent) {
          const parentIndex = output.findIndex(item => item.id === parent.parentId)

          if(!output[parentIndex].label) {
            output[parentIndex].label = []
          }

          output[parentIndex].label.push({
            refId: id,
            name: skill.name,
            isRef: false
          })
        }
      }
    })
  }

  return output;
}

export async function createSkill(dataSkills, mode, name) {
  let data = [];

  try {
    /* transaction */
    const session = await Skill.startSession();
    session.startTransaction();

    try {
      const skill = await Skill.create({
        name, mode,
      });

      const payloads = {
        date: new Date(),
        skill: skill._id
      }

      switch(mode) {
        case 'auto':
          const skillsConvert = convertSkills(dataSkills, mode);

          payloads.skills = skillsConvert;
          data = tree2(payloads.skills)[0].children;
          break;
        case 'single':
        default:
          payloads.skills = dataSkills.map(skill => ({
            title: skill.name
          }))
          data = payloads.skills;
          break;
      }

      const skillChart = SkillChart.create(payloads)

      await session.commitTransaction();
    } catch (e) {
      console.log(e);
      session.abortTransaction()

      return {
        code: 500,
        message: 'Cannot create skill chart',
        data
      }
    } finally {
      session.endSession();
    }

    return {
      code: 200,
      message: 'Create skill success',
      data
    }
  } catch (e) {
    console.log(e);
    return {
      code: 500,
      message: 'Cannot create skill chart',
      data
    }
  }
}