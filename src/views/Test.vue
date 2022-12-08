<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from "vue";
// import Chat from "vue3-beautiful-chat";

let participants = ref([
  {
    id: "user1",
    name: "Matteo",
    imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4",
  },
  {
    id: "user2",
    name: "Support",
    imageUrl: "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
  },
]);
let titleImageUrl = ref(
  "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
);
let messageList = ref([
  { type: "text", author: `me`, data: { text: `Say yes!` } },
  { type: "text", author: `user1`, data: { text: `No.` } },
]);
let newMessagesCount = ref(0);
let isChatOpen = ref(false);
let showTypingIndicator = ref("");
let colors = ref({
  header: {
    bg: "#4e8cff",
    text: "#ffffff",
  },
  launcher: {
    bg: "#4e8cff",
  },
  messageList: {
    bg: "#ffffff",
  },
  sentMessage: {
    bg: "#4e8cff",
    text: "#ffffff",
  },
  receivedMessage: {
    bg: "#eaeaea",
    text: "#222222",
  },
  userInput: {
    bg: "#f4f7f9",
    text: "#565867",
  },
});

let alwaysScrollToBottom = ref(false);

let messageStyling = ref(true);

// function sendMessage(text) {
//   if (text.length > 0) {
//     this.newMessagesCount = this.isChatOpen
//       ? this.newMessagesCount
//       : this.newMessagesCount + 1;
//     this.onMessageWasSent({ author: "support", type: "text", data: { text } });
//   }
// }

function onMessageWasSent(message) {
  messageList.value = [...messageList.value, message];
}

function openChat() {
  isChatOpen.value = true;
  newMessagesCount.value = 0;
}

function closeChat() {
  isChatOpen.value = false;
}

// function handleScrollToTop() {
// }

function handleOnType() {
  console.log("Emit typing event");
}

function editMessage(message) {
  let m = messageList.value.find((m) => m.id === message.id);
  m.isEdited = true;
  m.data.text = message.data.text;
}

function removeMessage(message) {
  console.log(message);
}
</script>

<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :deletionConfirmation="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
    />
  </div>
</template>
