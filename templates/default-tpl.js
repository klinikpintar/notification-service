module.exports = () => ({
  name: 'welcome',
  title: 'Welcome {{user.firstname}}',
  version: 1,
  channels: {
    sms: {
      from: '{{smsFrom}}',
      to: '{{user.phone}}',
      text: "Hi {{user.firstname}}, we're very happy to welcome you on board!"
    },
    email: {
      from: '{{emailFrom}}',
      to: '{{user.email}}',
      subject: 'Welcome {{user.firstname}}',
      html: `{% extends "templates/_layouts/email-transactional.html" %}
        {% block content %}
          Hi {{user.firstname}},<br><br>
          We're very happy to welcome you on board.<br><br>
          See you soon!
        {% endblock %}`
    },
    push: {
      registrationToken: '{{user.pushToken}}',
      title: 'Welcome {{user.firstname}}',
      body: "Hi {{user.firstname}}, we're very happy to welcome you on board"
    }
  },
  sampleData: {
    smsFrom: 'Notifme',
    emailFrom: '"David, Notif.me team" <david@example.com>',
    user: {
      firstname: 'John',
      email: 'john@example.com',
      phone: '+15000000001',
      pushToken: 'xxxxx'
    }
  }
})
