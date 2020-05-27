import {tree} from '@helpers/base.helper';
import {v4} from 'uuid';

export function convertSkills(skills, mode = 'auto') {
  switch (mode) {
    case 'single':

      return [];
    case 'auto':
      const treeSkills = tree(skills, undefined);

      const result = __convertSkillsChart(treeSkills);
      console.log(result);

      return treeSkills;
  }
}

function __convertSkillsChart(skills = [], output = [], parent = {}) {
  const skillsLength = skills.length;
  const id = v4()

  console.log(skills, '=====');

  if(skillsLength === 1) {
    const skill = skills[0]

    if(skill.children && skill.children.length) {
      const hasId = skill.hasOwnProperty('_id')

      if(parent.hasParent) {
        const parentIndex = output.findIndex(item => item.id === parent.parentId)

        output[parentIndex].ref = id
      }

      output.push({
        label: `${hasId ? skill.name : 'Mixed'} (${skill.children.map(item => item.name).join(' - ')})`,
        id: id
      })

      output = __convertSkillsChart(skill.children, output, {
        parentId: id,
        hasParent: true,
        parentName: skill.name
      })
    }
  } else {
    let label;
    const groupName = skills.map(skill => skill.name).join(' - ');
    if(parent.hasParent) {
      label = `${parent.parentName} (${groupName})`
    } else {
      label = `Mixed (${groupName})`
    }

    output.push({
      label
    })
  }

  return output;
}