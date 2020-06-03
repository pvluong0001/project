export default {
  methods: {
    defaultSeries(skills) {
      const length = skills.length;

      return [
        {
          name: 'User',
          data: Array(length).fill(50)
        }
      ]
    },
    defaultConfig(skills) {
      return {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: skills.map(skill => skill.title)
        },
        yaxis: {
          min: 0,
          max: 100
        }
      }
    },
    fetchVersions(skills) {
      return skills.map((item, index) => ({
        value: item._id,
        label: `Version ${++index}`
      }))
    }
  }
}
