import { button, defineChatFlow, message } from '~/chat-flow'

export default defineChatFlow({
  start: 'welcome',
  steps: {
    welcome: message({
      say: "Hi! I'm Volty's assistant. What brings you here today?",
      buttons: [
        button('Exploring Volty for my business', 'volty'),
        button('Comparing with my current tool', 'volty'),
        button('Pricing and plans', 'volty'),
        button('Something else', 'volty'),
      ],
      otherwise: 'volty',
    }),
  },
})
