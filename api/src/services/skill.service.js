import {tree} from '@helpers/base.helper';
import {v4} from 'uuid';

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
