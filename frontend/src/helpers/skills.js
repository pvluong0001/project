import {tree} from 'helpers/common';
import { uid } from 'quasar';

function __convertSkillsToChartConfig(
  skills = [], output = [], parent = {}) {
  const {name, parentId = null, uid = null} = parent;
  const length = skills.length;
  const title = length === 1 ? skills[0].name : (name || 'Mixed');

  const id = length === 1 ? skills[0]._id : uid()

  output.push({
    title,
    id
  });

  /** update referer */
  if (parentId) {

  }

  skills.forEach(skill => {
    if (skill.children?.length) {
      output = __convertSkillsToChartConfig(skill.children, output, {
        name: `${skill.name} (${skill.children.map(item => item.name).
          join(' - ')})`,
        parentId: skill._id,
        uid: uid(),
      });
    }
  });

  return output;
}

export function convertSkillsToChartConfig(skills = [], mode) {
  switch (mode) {
    case 'single':
      return []
    case 'auto':
    default:
      return skills.length ?
        tree(skills, undefined).map(skills => {
          console.log(__convertSkillsToChartConfig(skills.children),
            '======== output');
          return __convertSkillsToChartConfig(skills.children);
        }) :
        [];
  }

}

// output.push({
//   options: {
//     labels: skills.map(skill => skill.name),
//     fill: {
//       opacity: 0.3,
//       colors: '#FF5870',
//     },
//     yaxis: {
//       min: 0,
//       max: 100,
//       show: false
//     },
//     markers: {
//       size: 3,
//       hover: {
//         size: 5,
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       background: {
//         enabled: true,
//         borderRadius: 2,
//       },
//     },
//     tooltip: {
//       enabled: false,
//     },
//     title: {
//       text: title
//     }
//   },
//   series: [
//     {
//       name: 'Main',
//       data: length < 3 ? Array(3).fill(50) : Array(length).fill(50),
//     }],
//   type: 'radar',
//   chartTitle: parentName || 'Mixed',
// });
