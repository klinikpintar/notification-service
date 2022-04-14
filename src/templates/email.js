module.exports = () => ({
  name: 'welcome',
  title: 'Welcome {{data.name}}',
  version: 1,
  channels: {
    email: {
      from: '{{from}}',
      to: '{{to}}',
      subject: '{{subject}}',
      html: `{% extends "templates/_layouts/email-transactional.html" %}
        {% block content %}
          Hi {{data.name}},<br><br>
          We're very happy to welcome you on board.<br><br>
          See you soon!
        {% endblock %}`
    },
  },
  sampleData: {
    //
  }
})
