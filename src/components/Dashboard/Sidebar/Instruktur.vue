<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { appStore } from "@/stores/app";
import { onMounted, ref } from "vue";
import { confirmation } from "@/assets/js/utils";
import logoSidebar from "@/assets/static/logo-sidebar.png";

let widthContent = window.innerWidth;
let route = useRoute();
const storeApp = appStore();
let user = ref(null);
let open = ref(false);

onMounted(() => {
  if (storeApp.tokenInstruktur) {
    refreshToken();
  }
  user.value = JSON.parse(storeApp.userInstruktur);
});

function refreshToken() {
  axios
    .get(`${storeApp.baseurl}auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenInstruktur}`,
      },
    })
    .then((res) => {
      localStorage.setItem("tokenInstruktur", res.data.data.token);
      localStorage.setItem("userInstruktur", res.data.data.user);
    })
    .catch((err) => {
      console.log(err);
      confirmation(
        "Sesi telah habis, mohon untuk login ulang",
        "Sesi Habis"
      ).then(() => {
        localStorage.removeItem("tokenInstruktur");
        localStorage.removeItem("userInstruktur");
        window.close();
      });
    });
}

function sidebar() {
  document.querySelector(".sidebar").classList.toggle("hide");
  document.querySelector(".content").classList.toggle("hide");
  document.querySelector(".main-content").classList.toggle("hide");
  // document.querySelector(".content-footer").classList.toggle("hide");
  open.value = !open.value;
}

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
    bg: "#0179FF",
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
  <div class="dashboard-navigation">
    <div
      :class="`sidebar bg-gray-mice shadow ${widthContent > 992 ? '' : 'hide'}`"
    >
      <div class="d-flex justify-content-end d-lg-none">
        <a class="text-decoration-none text-center text-white" href="#">
          <img
            :src="logoSidebar"
            alt="Logo Sidebar"
            style="width: 90%"
            class="img-fluid"
          />
        </a>
      </div>
      <div
        class="d-none d-lg-block text-decoration-none text-center text-white"
      >
        <a
          class="d-none d-lg-block text-decoration-none text-center text-white"
          href="#"
        >
          <img
            :src="logoSidebar"
            alt="Logo Sidebar"
            style="width: 90%"
            class="img-fluid"
          />
        </a>
      </div>
      <div class="height-hide overflow-auto">
        <div class="menu-wrapper">
          <router-link
            :to="{ name: 'dashboard-instruktur' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.name == 'dashboard-instruktur' ? 'active' : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-dashboard"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Dashboard
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'dashboard-instruktur-test' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-instruktur-test' ? 'active' : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-file-pen"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Test
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'dashboard-instruktur-soal' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-instruktur-soal' ? 'active' : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-cubes"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Bank Soal
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'instruktur' }"
            class="text-white text-decoration-none"
          >
            <div class="item logout d-flex align-items-center">
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div>Keluar</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div
      :class="`content ${widthContent > 992 ? '' : 'hide'} d-none d-lg-block`"
    >
      <div class="section">
        <nav>
          <div class="card-shadow shadow rounded-0">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <div class="menu-bar" @click="sidebar">
                  <i class="fas fa-bars text-white me-3"></i>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      <span class="d-block text-white text-capitalize">{{
                        user?.username ?? "User"
                      }}</span>
                      <span class="d-block text-white small">{{
                        user?.role
                      }}</span>
                    </div>
                    <div
                      class="profile align-items-center justify-content-center"
                    >
                      <img src="./../../../assets/img/logo.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div :class="`content ${widthContent > 992 ? '' : 'hide'} d-lg-none`">
      <div class="mb-5">
        <nav>
          <div class="card-shadow rounded-0 bg-secondary-mice">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <img
                  src="./../../../assets/img/logo.png"
                  alt=""
                  style="width: 15%"
                />
                <div class="menu-bar">
                  <i
                    class="fas fa-bars text-dark fa-2x"
                    @click="sidebar"
                    v-if="!open"
                  ></i>
                  <i
                    class="fas fa-times text-dark fa-2x"
                    @click="sidebar"
                    v-else
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
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
</template>
