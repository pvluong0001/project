import {tree, tree2} from '@helpers/base.helper';
import {v4} from 'uuid';

export function convertSkills(skills, mode = 'auto') {
  switch (mode) {
    case 'single':

      return [];
    case 'auto':
      const treeSkills = tree(skills, undefined);

      console.log(treeSkills, '=======');

      return tree2(__convertSkillsChart(treeSkills))[0].children;
  }
}

function __convertSkillsChart(skills = [], output = [], parent = {}) {
  const skillsLength = skills.length;

  if(skillsLength === 1) {
    const skill = skills[0]

    if(skill.children && skill.children.length) {
      const hasId = skill.hasOwnProperty('_id')
      const id = v4()

      if(parent.hasParent) {
        const parentIndex = output.findIndex(item => item.id === parent.parentId)

        output[parentIndex].ref = id
      }

      const arrName = skill.children.map(item => item.name)

      output.push({
        title: `${hasId ? skill.name : 'Mixed'} (${arrName.join(' - ')})`,
        id: id,
        label: arrName,
        parent: parent.hasParent ? parent.parentId: null
      })

      output = __convertSkillsChart(skill.children, output, {
        parentId: id,
        hasParent: true,
        parentName: skill.name
      })
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
      if(skill.children && skill.children.length) {
        const id = v4()

        if(parent.hasParent) {
          const parentIndex = output.findIndex(item => item.id === parent.parentId)

          if(!output[parentIndex].ref) {
            output[parentIndex].ref = []
          }

          output[parentIndex].ref.push(id)
        }

        const arrName = skill.children.map(item => item.name)

        output.push({
          title: `${skill.name} (${arrName.join(' - ')})`,
          id,
          label: arrName,
          parent: parent.hasParent ? parent.parentId : null
        })

        output = __convertSkillsChart(skill.children, output, {
          parentId: id,
          hasParent: true,
          parentName: skill.name
        })
      }
    })
  }

  return output;
}
