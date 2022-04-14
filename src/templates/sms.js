module.exports = () => ({
  name: 'welcome',
  title: 'Welcome {{data.name}}',
  version: 1,
  channels: {
    sms: {
      from: '{{from}}',
      to: '{{to}}',
      text: '{{text}}'
    }
  },
  sampleData: {
    ///
  }
})
