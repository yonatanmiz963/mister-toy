<template>
  <div class="chat flex column">
    <div class="btn">
      <button @click="closeChat">X</button>
    </div>
    <h2>Lets Chat About This Toy</h2>
    <ul class="msg-box">
      <li v-for="(msg, idx) in msgs" :key="idx">
        {{ msg.from }} : {{ msg.txt }} 
      </li>
    </ul>
    <div v-if="typingUser" class="typing-user">
      <h4> {{ typingUser.user }} is typing.. </h4>
    </div>
    <form @submit.prevent="sendMsg">
      <input @input="debounceIsTyping" type="text" v-model="messageToSend.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from '@/services/socket.service';
import { utilService } from '@/services/util.service';

export default {
  props: ['toyId'],
  data() {
    return {
      messageToSend: { txt: '' },
      msgs: [],
      typingUser: null
    };
  },
  computed: {
      loggedUser() {
          return this.$store.getters.loggedUser
      }
  },
  created() {
    socketService.setup();
    socketService.emit('chat topic', this.toyId);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('chat getTypingUser', this.setTypingUser);
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
  },
  methods: {
    setTypingUser(user) {
      this.typingUser = user
      setTimeout(() => {
        this.typingUser = null
      }, 3000)
    },
    debounceIsTyping() {
      const debouneFunc = utilService.debounce(this.sendIsTyping, 1000)
      debouneFunc()
    },
    sendIsTyping() {
      console.log('debounce triggered');
      socketService.emit('chat typingUser', { user: this.loggedUser.username });
    },
    addMsg(msg) {
      this.msgs.push(msg);
      this.$emit('saveMsg', msg)
    },
    sendMsg() {
      this.messageToSend.from = this.loggedUser.username
      socketService.emit('chat newMsg', this.messageToSend);
      this.messageToSend.txt = ''
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic);
    },
    closeChat() {
      this.$emit('closeChat');
    },
  },
};
</script>
