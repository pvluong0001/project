import {tree} from 'helpers/common';

function __convertSkillsToChartConfig(skills = [], output = [], parentName = '') {
  if(skills.length === 1) {
    output.push({
      options: {
        labels: [(new Date).getTime()]
      },
      series: [
        {
          name: skills[0].name,
          data: [30]
        }
      ],
      type: 'line',
      chartTitle: skills[0].name
    })
  } else {
    output.push({
      options: {
        labels: skills.map(skill => skill.name),
        fill: {
          opacity: 0.3,
          colors: '#FF5870'
        },
        yaxis: {
          min: 0,
          max: 100
        },
        markers: {
          size: 3,
          hover: {
            size: 5
          }
        },
        dataLabels: {
          enabled: true,
          background: {
            enabled: true,
            borderRadius:2,
          }
        },
        tooltip: {
          enabled: false
        }
      },
      series: [{
        name: 'Main',
        data: [parseInt(Math.random().toString().slice(3, 5)), parseInt(Math.random().toString().slice(3, 5)), parseInt(Math.random().toString().slice(3, 5))]
      }],
      type: 'radar',
      chartTitle: parentName || 'Mixed'
    })
  }

  skills.forEach(skill => {
    if(skill.children?.length) {
      output = __convertSkillsToChartConfig(skill.children, output, `${skill.name} (${skill.children.map(item => item.name).join(' - ')})`)
    }
  })

  return output
}

export function convertSkillsToChartConfig(skills = []) {
  return skills.length ? __convertSkillsToChartConfig(tree(skills, undefined)) : []
}
